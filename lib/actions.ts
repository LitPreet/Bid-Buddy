"use server";
import { bids, items, items as itemsSchema, users } from "@/app/db/schema";
import { database } from "@/app/db/database";
import { revalidatePath } from "next/cache";
import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { Knock } from "@knocklabs/node"
import { env } from "@/app/env";
import { isBidOver } from "./bids";
interface Props {
  name: string;
  startingPrice: number
  file: string
  endDate: Date
}
const knock = new Knock(env.KNOCK_SECRET_KEY)

export async function createItemAction({ name, startingPrice, file, endDate }: Props) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized')
  }
  const user = session.user;
  if (!user) {
    throw new Error('Unauthorized')
  }
  // const priceAsCents = Math.floor(parseFloat(startingPrice))
  await database.insert(itemsSchema).values({
    name: name,
    startingPrice,
    currentBid: startingPrice,
    userId: user.id!,
    fileKey: file,
    endDate,
  });
  redirect("/all-auctions");
}

export async function createBidAction(itemId: number) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized')
  }
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("You must be logged in to place a bid");
  }
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });


  if (!item) {
    throw new Error("Item not found");
  }
  if (isBidOver(item)) {
    throw new Error("This auction is already over");
  }
  const latestBidValue = item.currentBid + item.bidInterval;
  await database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId,
    timestamp: new Date(),
  })

  await database
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  const currentBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      user: true,
    },
  })
  // const allusers = await database.query.users.findFirst({
  //     where: eq(users, item.userId),
  // })

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];
  for (const bid of currentBids) {
    if (bid.userId !== userId) {
      recipients.push({
        id: bid.userId,
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email,
      });
    }
  }
  // for (const bid of currentBids) {
  //   console.log(bid.userId)
  //   console.log(userId)
  //   console.log(
  //     bid.userId === userId &&
  //     !recipients.find((recipient) => recipient.id === bid.userId)
  //   )
  //   if (
  //     bid.userId !== userId &&
  //     !recipients.find((recipient) => recipient.id === bid.userId)
  //   ) {
  //     console.log('im inside')
  //     recipients.push({
  //       id: bid.userId + "",
  //       name: bid.user.name ?? "Anonymous",
  //       email: bid.user.email,
  //     });
  //   }
  // }
  console.log(recipients, 'he')
  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session?.user?.name ?? "Anonymous",
        email: session?.user?.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidAmount: latestBidValue,
        itemName: item.name,
      },
    });
  }
  revalidatePath(`/items/${items.id}`)
}
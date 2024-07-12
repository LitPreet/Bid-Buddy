"use server";
import { bids, items, items as itemsSchema } from "@/app/db/schema";
import { database } from "@/app/db/database";
import { revalidatePath } from "next/cache";
import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

interface Props {
    name: string;
    startingPrice: string
    file: string
}

export async function createItemAction({ name, startingPrice, file }: Props) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized')
    }
    const user = session.user;
    if (!user) {
        throw new Error('Unauthorized')
    }
    const priceAsCents = Math.floor(parseFloat(startingPrice))
    await database.insert(itemsSchema).values({
        name: name,
        startingPrice: priceAsCents,
        userId: user.id!,
        fileKey: file
    });
    redirect("/all-auctions");
}

export async function createBidAction(itemId: number) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized')
    }
    const userId = session.user?.id;
    if (!userId) {
        throw new Error("You must be logged in to place a bid");
    }
    const item = await database.query.items.findFirst({
        where: eq(items.id, itemId),
    });

    if (!item) {
        throw new Error("Item not found");
    }
    const latestBidValue = item.currentBid + item.bidInterval;
    await database.insert(bids).values({
        amount: latestBidValue,
        itemId,
        userId: userId,
        timestamp: new Date(),
    })

    await database
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

    revalidatePath(`/items/${items.id}`)

}
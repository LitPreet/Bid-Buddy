"use server";
import { database } from "@/app/db/database";
import { desc, eq } from "drizzle-orm";
import { bids, items } from "@/app/db/schema";

export default async function getBidsforItem(itemId: string) {
   const allBids = await database.query.bids.findMany({
    where: eq(bids.itemId,parseInt(itemId)),
    orderBy: desc(bids.id),
    with:{
      user:{
        columns: {
          image: true,
          name: true
        }
      }
    }
  })
  return allBids
}



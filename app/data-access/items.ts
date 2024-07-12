import { database } from "@/app/db/database";
import { eq } from "drizzle-orm";
import { items } from "@/app/db/schema";

export default async function getItem(itemId: string) {
   const allItems =  await database.query.items.findFirst({
        where: eq(items?.id, parseInt(itemId)),
      });
      return allItems
}

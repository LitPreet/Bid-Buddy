"use server";

import { database } from "@/app/db/database";
import { items } from "@/app/db/schema";
import { auth } from "@/auth";
import CardGrid from "@/components/card-grid";
import EmptyState from "@/components/emptyState";
import { eq } from "drizzle-orm";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });
  return (
    <div>
      {allItems && allItems.length > 0 ? (
        <CardGrid items={allItems} />
      ) : (
          <EmptyState />
     )} 
    </div>
  );
};

export default page;

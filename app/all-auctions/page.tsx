'use server'

import { database } from "@/app/db/database";
import CardGrid from "@/components/card-grid";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "All Auctions - Bid Buddy",
  description: "Explore all active auctions on Bid Buddy.",
};
const page = async() => {
    const allItems = await database.query.items.findMany();
  return (
    <div>
       <CardGrid items={allItems} />
    </div>
  )
}

export default page



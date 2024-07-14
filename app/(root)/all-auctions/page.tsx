'use server'

import { database } from "@/app/db/database";
import CardGrid from "@/components/card-grid";
import Loading from "./loading";

const page = async() => {
    const allItems = await database.query.items.findMany();
  return (
    <div>
       <CardGrid items={allItems} />
    </div>
  )
}

export default page



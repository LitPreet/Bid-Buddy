'use server'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { database } from "@/app/db/database";
import { Input } from "@/components/ui/input";
import { createItemAction } from '@/lib/actions';
import { DatePickerDemo } from '@/components/date-picker';
import { PostItem } from '@/components/forms/PostItem';
import Image from 'next/image';


const page = async() => {
    // const [date, setDate] = useState<Date | undefined>();
  // const bidsItems = await database.query.bids.findMany();
 
  return (
    <section className="w-full bg-red-300 flex justify-center flex-col items-center">
      <h1 className="text-4xl font-bold my-3">Post an Item</h1>
      <PostItem />
     
      {/* <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div> */}
     
    </section>
  )
}

export default page

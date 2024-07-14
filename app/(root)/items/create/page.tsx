'use client'
import React, { useState } from 'react'
import { PostItem } from '@/components/forms/PostItem';

const page = async() => {
    // const [date, setDate] = useState<Date | undefined>();
  // const bidsItems = await database.query.bids.findMany();
 
  return (
    <section className="w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold my-3">Post an Item</h1>
      <PostItem />
    </section>
  )
}

export default page

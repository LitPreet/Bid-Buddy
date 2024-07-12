"use server";
import React from "react";
import { database } from "@/app/db/database";
import { eq } from "drizzle-orm";
import { items } from "@/app/db/schema";
import Empty from "@/public/images/empty.png";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { formatToDollar } from "@/lib/currency";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}


const page = async ({ params: { itemId } }: { params: { itemId: string } }) => {
  const item = await database.query.items.findFirst({
    where: eq(items?.id, parseInt(itemId)),
  });
  if (!item) {
    return (
      <div className="w-full flex h-[500px] flex-col justify-center items-center">
        <div className="w-[300px]">
          <Image
            src={Empty}
            alt="emp"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h1 className="text-black text-center dark:text-white font-bold text-3xl sm:text-4xl">
          Item Not Found
        </h1>
        <p className="text-zinc-400 text-center my-4 tracking-wide leading-relaxed text-sm">
          The item you're trying to view is invalid. Please go back and search
          for a different item.
        </p>
        <Link
          href="/all-auctions"
          className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-primary hover:bg-blue-600"
        >
          View Auctions
        </Link>
      </div>
    );
  }
const bids = [
  {
    id:1,
    amount: '100',
    userName: 'Alice',
    timeStamp: new Date()
  },
  {
    id:2,
    amount: '800',
    userName: 'john',
    timeStamp: new Date()
  },
  {
    id:3,
    amount: '150',
    userName: 'Jane',
    timeStamp: new Date()
  },
  {
    id:4,
    amount: '120',
    userName: 'Lina',
    timeStamp: new Date()
  }
]
const hasBids = bids.length > 0;
  return (
    <main className="flex  w-full">
      <div className="flex-1 px-8">
      <h1 className="font-semibold text-2xl mt-4">
        <span className="font-normal">Auction for</span> {item.name}
      </h1>
        <Image className="rounded-xl" src={item.fileKey} alt={item.name} width={300} height={300} />
        <div>Starting Price of <span className="font-bold">${formatToDollar(item.startingPrice)}</span></div>
        <div className="space-y-4">
          Bid Interval <span className="font-bold dark:text-gray-400 text-gray-600">${formatToDollar(item.bidInterval)}</span>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold my-3">Current Bids</h2>
        {hasBids ? (  <ul className="space-y-4">
          {bids.map((bid) => {
            return (<li key={bid.id} className="bg-gray-200 rounded-xl dark:text-black text-gray-600">
              <div className=" flex gap-4 p-4">
                <span className="font-bold">${formatToDollar(+bid.amount)}</span>
                <span className="font-semibold">{bid.userName}</span>
                <span className="font-semibold">{formatTimestamp(bid.timeStamp)}</span>
              </div>
            </li>)
          })}
        </ul>) :(<div>
          <p>No Bids yet</p>
        </div>)}
      
      </div>
    </main>
  );
};

export default page;

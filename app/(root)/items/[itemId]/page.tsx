"use server";
import React from "react";
import Empty from "@/public/images/empty.png";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { formattedPrice, formatToDollar } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { createBidAction } from "@/lib/actions";
import getBidsforItem from "@/app/data-access/bids";
import getItem from "@/app/data-access/items";
import { auth } from "@/auth";
import { isBidOver } from "@/lib/bids";
import { Badge } from "@/components/ui/badge";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

const page = async ({ params: { itemId } }: { params: { itemId: string } }) => {
  const item = await getItem(itemId);
  const session = await auth();

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

  const allBids = await getBidsforItem(itemId);
  const hasBids = allBids.length > 0;
  const canPlaceBid = session && item.userId !== session.user.id && !isBidOver(item);;
  return (
    <main className="flex  w-full">
      <div className="flex-1 px-8">
        <h1 className="font-semibold text-2xl mt-4">
          <span className="font-normal">Auction for</span> {item.name}
        </h1>
        {isBidOver(item) && (
            <Badge className="w-fit" variant="destructive">
              Bidding Over
            </Badge>
          )}
        <Image
          className="rounded-xl"
          src={item.fileKey}
          alt={item.name}
          width={300}
          height={300}
        />
        <div>
          Current Bid{" "}
          <span className="font-bold">${formattedPrice(item.currentBid)}</span>
        </div>
        <div>
          Starting Price of{" "}
          <span className="font-bold">
            ${formattedPrice(item.startingPrice)}
          </span>
        </div>
        <div className="space-y-4">
          Bid Interval{" "}
          <span className="font-bold dark:text-gray-400 text-gray-600">
            ${formattedPrice(item.bidInterval)}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between my-2">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {canPlaceBid && (
            <form action={createBidAction.bind(null, item.id)}>
              <Button>Place a Bid</Button>
            </form>
          )}
        </div>
        {hasBids ? (
          <ul className="space-y-4">
            {allBids.map((bid) => {
              return (
                <li
                  key={bid.id}
                  className="bg-gray-200 rounded-xl dark:text-black text-gray-600"
                >
                  <div className=" flex gap-4 p-4">
                    <span className="font-bold">
                      ${formattedPrice(bid.amount)}
                    </span>
                    <span className="font-semibold">{bid.user.name}</span>
                    <span className="font-semibold">
                      {formatTimestamp(bid.timestamp)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            <p>No Bids yet</p>
            {canPlaceBid && (
            <form action={createBidAction.bind(null, item.id)}>
              <Button>Place a Bid</Button>
            </form>
          )}
          </div>
        )}
      </div>
    </main>
  );
};

export default page;

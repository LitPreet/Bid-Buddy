"use server";
import React from "react";
import Empty from "@/public/images/empty.png";
import NoData from "@/public/images/nodata1.png";
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
        The item you&apos;re trying to view is invalid. Please go back and search
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
  const canPlaceBid =
    session && item.userId !== session.user.id && !isBidOver(item);
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
      <div className="col-span-1 px-8">
        <h1 className="font-bold text-2xl mt-2 text-primary">
          <span className="font-normal dark:text-white text-zinc-600">
            Auction for
          </span>{" "}
          {item.name}
        </h1>
        <div
          className="relative w-full"
          style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
        >
          <Image
            src={item?.fileKey || ""}
            alt={item?.fileKey || ""}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          {isBidOver(item) && (
            <Badge
              className="w-fit px-5 py-2 text-md absolute top-1/2 left-[40%]"
              variant={"destructive"}
            >
              Bidding Over
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center w-full my-2">
          <p className="text-zinc-600 dark:text-white">
            Starting Price -{" "}
            <span className="font-semibold">
              ${formattedPrice(item.startingPrice)}
            </span>
          </p>
          <p className="text-zinc-600 dark:text-white">
            Current Bid -{" "}
            <span className="font-semibold">
              ${formattedPrice(item.currentBid)}
            </span>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-zinc-600 dark:text-white">
            Bid Interval -{" "}
            <span className="font-semibold">
              {" "}
              ${formattedPrice(item.bidInterval)}
            </span>
          </p>
        </div>
      </div>
      <div className="col-span-1  px-8">
        <div className="flex justify-between my-2">
          <h2 className="text-2xl dark:text-white text-zinc-600 font-semibold">
            Current Bids
          </h2>
          {canPlaceBid && (
            <form action={createBidAction.bind(null, item.id)}>
              <Button>Place a Bid</Button>
            </form>
          )}
        </div>
        {hasBids ? (
          <ul className="space-y-2 flex flex-col w-full md:w-[70%] items-start h-[600px] md:h-[500px] pr-4 overflow-y-auto">
            {allBids.map((bid) => {
              return (
                <li key={bid.id} className="w-full">
                  <div className="flex items-center p-4  bg-white dark:bg-zinc-700 rounded-lg shadow-xl  w-full relative">
                    <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">
                      Bid
                    </span>
                    <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 dark:text-gray-100 absolute bottom-0 right-0">
                      {formatTimestamp(bid.timestamp)}
                    </span>

                    <img
                      className="h-12 w-12 rounded-full"
                      alt="Bidder avatar"
                      src={bid.user.image || ""}
                    />

                    <div className="ml-5">
                      <h4 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                        {bid.user.name}
                      </h4>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-100">
                      {" "}
                        ${formattedPrice(bid.amount)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="w-full flex  flex-col justify-center items-center">
              <Image
                src={NoData}
                alt="emp"
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-md"
              />
            <h1 className="text-black text-center dark:text-white font-bold text-xl sm:text-xl">
              No Bids Yet
            </h1>

            {canPlaceBid && (
              <form action={createBidAction.bind(null, item.id)} className="my-2">
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

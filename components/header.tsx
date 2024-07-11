"use client";

import { Button } from "@/components/ui/button";
// import { formatToDollar } from "@/util/currency";
// import {
//   NotificationCell,
//   NotificationFeedPopover,
//   NotificationIconButton,
// } from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ModeToggle } from "./toggleMode";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();
   if(!session) return null
  const userId = session?.status === 'authenticated';
  return (
    <div className="flex justify-center">
      <div className="w-[90%]  my-4 p-2 rounded-full border-[1px] border-gray-400">
      <div className="container  flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            {/* <Image src="/public/images/debit_8818043.png" width="50" height="50" alt="Logo" /> */}
            BidBuddy.com
          </Link>
          <ModeToggle />

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Auctions
            </Link>

            {userId && (
              <>
                <Link
                  href="/items/create"
                  className="hover:underline flex items-center gap-1"
                >
                  Create Auction
                </Link>

                <Link
                  href="/auctions"
                  className="hover:underline flex items-center gap-1"
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <div className="rounded-xl">
                      <Link
                        className="text-blue-400 hover:text=blue-500"
                        onClick={() => {
                          setIsVisible(false);
                        }}
                        href={`/items/${item.data.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">{item.data.itemName}</span>{" "}
                        by ${formatToDollar(item.data.bidAmount)}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              />
            </>
          )} */}

          {session && session?.data?.user!.image && (
            <Image
              src={session.data.user.image}
              width="40"
              height="40"
              alt="user avatar"
              className="rounded-full"
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
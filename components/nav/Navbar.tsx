"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import Profile from "./Profile";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../toggleMode";
import { formattedPrice, formatToDollar } from "@/lib/currency";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const userId = session?.data?.user.id;

  return (
    <nav
      className={`flex justify-center w-full py-7 bg-transparent z-10 ${
        pathname === "/" ? "absolute" : ""
      }`}
    >
      <div className="container  flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex">
            <p className="font-bold text-3xl ml-2">
              Bid<span className="text-primary">Buddy</span>
            </p>
          </Link>
          <div className="md:flex md:items-center gap-8 hidden">
            <Link
              href="/all-auctions"
              className={`hover:text-primary transition-all duration-150 flex items-center gap-1 ${pathname === '/all-auctions' ? 'text-primary' : ''}`}
            >
              All Auctions
            </Link>
            {userId && (
              <div className="flex gap-8">
                <Link
                  href="/items/create"
                  className={`hover:text-primary transition-all duration-150 flex items-center gap-1 ${pathname === '/items/create' ? 'text-primary' : ''}`}
                >
                  Create Auction
                </Link>

                <Link
                  href="/my-auctions"
                  className={`hover:text-primary transition-all duration-150 flex items-center gap-1 ${pathname === '/my-auctions' ? 'text-primary' : ''}`}
                >
                  My Auctions
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
        {userId && (
          <>
          <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              
            <div  style={{ zIndex: 1000 }}>
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
                        href={`/items/${item.data?.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">{item.data?.itemName}</span>{" "}
                        with ${formattedPrice(item.data?.bidAmount)}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              
                />
                </div>
            </>
          )}
          {userId ? (
            <div className="flex gap-4">
              <ModeToggle />
              <Profile />
            </div>
          ) : (
            <Button type="submit" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </div>
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
      </div>
    </nav>
  );
};

export default Navbar;

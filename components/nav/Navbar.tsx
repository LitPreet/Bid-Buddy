"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Profile from "./Profile";
import Notification from "./Notifications";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../toggleMode";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  if (!session) return null;
  const userId = session?.status === "authenticated";

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
              href="/"
              className="hover:text-primary transition-all duration-150 flex items-center gap-1"
            >
              All Auctions
            </Link>
            {userId && (
              <div className="flex gap-8">
                <Link
                  href="/bids/create"
                  className="hover:text-primary transition-all duration-150 flex items-center gap-1"
                >
                  Create Auction
                </Link>

                <Link
                  href="/auctions"
                  className="hover:text-primary transition-all duration-150 flex items-center gap-1"
                >
                  My Auctions
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {userId ? (
            <div className="flex gap-4">
              <ModeToggle />
              <Notification />
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

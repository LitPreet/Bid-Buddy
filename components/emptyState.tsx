/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-black flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-primary font-dark font-extrabold mb-8">
            {" "}
            Not <span className="text-black dark:text-white">Found</span>
          </div>
          <p className="text-2xl md:text-3xl font-light dark:text-gray-300 leading-normal mb-8">
            Sorry we couldn't find your auctions you're looking for
          </p>
          <Link
            href="/items/create"
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-primary hover:bg-blue-600"
          >
            Create Auction
          </Link>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <Image
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            className="w-full"
            style={{objectFit:"cover"}}
            placeholder = "data:image/..."
            width={50}
            height={50}
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

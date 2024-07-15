import React from 'react';
// import dynamic from 'next/dynamic';
import { PostItem } from '@/components/forms/PostItem';
import { Metadata } from 'next';
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// const PostItem = dynamic(
//   () => import('@/components/forms/PostItem').then(module => module.PostItem) as any,
//   { ssr: false },
// ) as any;

export const metadata:Metadata = {
  title: "Create Auction - Bid Buddy",
  description: "Create a new auction listing on Bid Buddy.",
};

const page = () => {
  return (
    <section className="w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold my-3">Post an Item</h1>
      <PostItem />
    </section>
  )
}

export default page

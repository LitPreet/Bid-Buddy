import React from 'react';
import dynamic from 'next/dynamic';
const PostItem = dynamic(
  () => import('@/components/forms/PostItem').then(module => module.PostItem) as any,
  { ssr: false },
) as any;

const page = () => {
  return (
    <section className="w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold my-3">Post an Item</h1>
      <PostItem />
    </section>
  )
}

export default page

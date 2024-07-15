import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Loading = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
    <div className="col-span-1 px-8">
        <Skeleton  className='p-4 w-1/2 md:w-1/4'/>
      <div
        className="relative w-full"
      >
        <Skeleton className='w-full h-[300px] my-2'/>
      </div>
      <div className="flex justify-between items-center w-full my-2">
        <Skeleton className='p-4 w-1/3 md:w-1/4'/>
       <Skeleton className='p-4 w-1/3 md:w-1/4'/>
      </div>
      <div className="space-y-4">
       <Skeleton className='p-4 w-1/3 md:w-1/4'/>
      </div>
    </div>
    <div className="col-span-1  px-8">
      <div className="flex justify-between my-2">
       <Skeleton className='w-1/3 md:w-1/4'/>
      </div>
      {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-16 my-2 w-full md:w-[60%] rounded-xl" />
        ))}
    </div>
  </main>
  )
}

export default Loading

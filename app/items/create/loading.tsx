import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section className="w-full flex justify-center flex-col items-center">
      <Skeleton className="p-4 w-1/2 md:w-1/4"/>
       <div className=' w-full md:w-1/3 p-2 flex flex-col gap-3 my-3 justify-center items-center'>
       <Skeleton className="p-4 w-full"/>
       <Skeleton className="p-4 w-full"/>
       <Skeleton className="p-4 w-full"/>
       <Skeleton className="p-4 w-full"/>
       <Skeleton className="p-4 w-full"/>
       <Skeleton className="p-4 w-full"/>
       </div>
    </section>
  )
}

export default Loading

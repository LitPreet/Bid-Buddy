'use client'
import React from 'react'
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface Props{
    items: {
        id: number;
        name: string;
        userId: string;
        startingPrice: number;
        fileKey: string;
    }[]
}

const CardGrid = ({items}:Props) => {
  return (
       <div className="max-w-5xl mx-auto px-8">
    <HoverEffect items={items} />
  </div>
  )
}

export default CardGrid
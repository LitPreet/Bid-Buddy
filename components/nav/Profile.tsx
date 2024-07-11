'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { LockOpen } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

function Profile() {
    const session = useSession();
    const [position, setPosition] = useState("bottom")
    if(!session) return null
   const userId = session?.status === 'authenticated';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Image
          src={session?.data?.user?.image|| ''}
          alt={session?.data?.user?.name || ''}
          width={40}
          height={40}
          className="rounded-full ring-2 ring-primary"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
           <div className="px-2">
          <p className="text-sm">{session?.data?.user?.name}</p>
         <p className="text-sm text-gray-500">{session?.data?.user?.email}</p>
       </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='block md:hidden'>
        <DropdownMenuItem>
           <Link href="/" className='my-1'>All Auctions</Link>
           </DropdownMenuItem>
           <DropdownMenuItem><Link href="/items/create" className='my-1'>Create Auction</Link>  </DropdownMenuItem>
           <DropdownMenuItem><Link  href="/auctions" className='my-1'>My Auctions</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        </DropdownMenuGroup>
           <Button
          variant="ghost"
          className="w-full flex justify-between items-center"
          onClick={() => signOut({
            callbackUrl: "/",
          })}
        >
          Logout <LockOpen />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default Profile

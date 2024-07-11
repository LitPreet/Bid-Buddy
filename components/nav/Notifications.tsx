'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Bell } from 'lucide-react'

function Notification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Bell   width={40}
          height={40}  className="rounded-full hover:bg-gray-500 duration-150 transition-all p-2 cursor-pointer"/>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
           <div className="px-2">
        <p>hey</p>
       </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default Notification

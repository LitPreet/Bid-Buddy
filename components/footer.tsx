import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
<footer className="bg-white rounded-lg shadow dark:bg-black ">
    <div className="w-full mx-auto max-w-screen-xl p-4">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">BidBuddy™</Link>. All Rights Reserved.
    </span>
    </div>
</footer>
  )
}

export default Footer

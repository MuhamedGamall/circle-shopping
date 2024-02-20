import Icons from '@/components/icons'
import React from 'react'
import NavLinks from './nav-links'

export default function Navbar() {
  return (
    <header className="bg-white  border-b  ">
    <div className="flex gap-2 justify-between items-center mx-auto w-full max-w-[1890px] p-2.5">
      <Icons.storeLogo />
      <NavLinks />
    </div>
  </header>
  )
}

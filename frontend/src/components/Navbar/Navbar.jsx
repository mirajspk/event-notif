import { Button } from "../ui/button"
import React from 'react'
const Navbar = () => {
  return (
    <div className="flex h-[60px] fixed top-0 left-0 right-0 justify-between shadow shadow-[0 0 0 0.5] items-center bg-white z-100">
      <text href="#" className="left-[115px] flex-1 pl-[115px] size-[30px] text-2xl font-medium leading-tight cursor-pointer">KUevents</text>
      <nav className="flex flex-[1] ">
        <ul className="flex flex-1 justify-around text-[#576974]">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Events</a>
          <a href="#" className="hover:text-gray-400">Clubs</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </ul>
      </nav>
      <div className="flex flex-1 justify-end">
        <Button type="submit" variant="iconNB" className="borer-none">Log in</Button>
        <Button type="submit" variant="default" className="mr-2">Sign up</Button>
      </div>
    </div>
  )
}

export default Navbar

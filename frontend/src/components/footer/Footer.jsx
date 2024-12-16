import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 fixed bottom-0 right-0 left-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-4 md:mb-0 ">
            <h2 className="text-2xl font-bold mb-4">KUevents</h2>
            <nav>
              <ul className="flex flex-row justify-around space-x-14">
                <a href="#" className="hover:text-white">Home</a>
                <a href="#" className="hover:text-white">Events</a>
                <a href="#" className="hover:text-white">Clubs</a>
                <a href="#" className="hover:text-white">Contact</a>
                <a href="#" className="hover:text-white">FAQs</a>
                <a href="#" className="hover:text-white">About</a>
              </ul>
            </nav>
          </div>
          <div className="md:mt-0 w-[326.40px] h-[38.59px]">
            <h3 className="text-lg font-semibold mb-2 justify-start">Subscribe to get event notifications</h3>
            <form className="flex border-0 w-[326.40px] h-[38.59px]">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white w-auto flex-1"
              />
              <Button type="submit" variant="default" className="right-0">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white"><Facebook size={24} /></a>
            <a href="#" className="hover:text-white"><Instagram size={24} /></a>
            <a href="#" className="hover:text-white"><Twitter size={24} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={24} /></a>
          </div>
          <p className="text-sm">Copyright © KUevents 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


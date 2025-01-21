import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container mx-auto">
        <div className="Upper-footer">
          <div className="footer-nav">
            <h2 className="text-2xl font-bold mb-4">KUevents</h2>
            <ul className="nav-item flex space-y-4 md:space-y-0 md:space-x-10">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Events</a></li>
              <li><a href="#" className="hover:text-white">Clubs</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
            </ul>
          </div>
          <div className="subscribe">
            <h3 className="subscrible-text text-lg font-semibold mb-2 md:text-nowrap">Subscribe to get event notifications</h3>
            <form className="form-button">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white w-full md:flex-1 mb-2 md:mb-0"
              />
              <Button type="submit" variant="default" className="md:ml-2">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="social">
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

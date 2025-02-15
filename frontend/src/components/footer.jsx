import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 md:p-8 w-full">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-8 md:mb-0">
            <a href='/'>
              <h2 className="text-3xl font-mono mb-6">KUevents</h2>
            </a>
            <ul className="space-y-4 md:space-y-0 md:flex md:space-x-10">
              <li>
                <a href="/" className="hover:text-white">Home</a>
              </li>
              <li>
                <a href="/events" className="hover:text-white">Events</a>
              </li>
              <li>
                <a href="/clubs" className="hover:text-white">Clubs</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white">
              <Facebook size={30} strokeWidth={2.25} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={30} strokeWidth={2.25} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={30} strokeWidth={2.25} />
            </a>
            <a href="#" className="hover:text-white">
              <Linkedin size={30} strokeWidth={2.25} />
            </a>
          </div>
          <p className="text-sm text-center md:text-left">
            Copyright © KUevents 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;

import React from 'react'
import { Header } from "@/components/ui/custom/Header";
import Footer from './Footer'

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="md:flex md:mx-auto md:w-3/4 overflow-y-auto flex-grow pt-3">
        <div className="w-full min-h-screen p-4">
          <h1 className="font-bold text-4xl">Get in Touch</h1>
          <div className="mt-10">
            <div className='text-xl text-wrap pl-1 leading-[45px]'>
              <p className='font-semibold'>We’d love to hear from you! Whether you have a question, feedback, or an exciting opportunity to discuss, feel free to reach out.</p>
              <li>Email: abhisekhjoshi13@gmail.com</li>
              <li>Phone: +977-9841234567</li>
              <li>Address: Kathmandu, Nepal</li>
              <li>Facebook: <a href="https://www.facebook.com/abhisekh.joshi.9" target="_blank" rel="noreferrer">Abhisekh Joshi</a></li>
              <li>LinkedIn: <a href="https://www.linkedin.com/in/abhisekh-joshi-0b1b3b1b1/" target="_blank" rel="noreferrer">Abhisekh Joshi</a></li>
              <p className='font-semibold'>Alternatively, you can email us on given address, and we’ll get back to you as soon as possible!</p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

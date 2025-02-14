import React from 'react'
import { Header } from "@/components/ui/custom/Header";
import Hero from "@/components/ui/custom/hero";
import { Button } from "@/components/ui/custom/customButton";
import Footer from "@/components/footer"
import EventCard from './eventcard';
import { Link } from 'react-router'
import EventcardThree from './eventcardThree'

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <div className="">
        <h2 className="text-2xl font-bold my-20 text-center">Upcoming Events</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <EventcardThree />
        </div>
        <div className="flex justify-center my-20">
          <Link to="/events">
            <Button>More events</Button>
          </Link>
        </div>
        <Footer />
      </div>
    </>

  )
}


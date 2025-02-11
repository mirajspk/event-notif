import React from 'react'
import { Header } from "@/components/ui/custom/Header";
import Hero from "@/components/ui/custom/hero";
import { Button } from "@/components/ui/custom/customButton";
import Footer from "@/components/footer"
import EventCard from './eventcard';
import { Link } from 'react-router'

export default function HomePage() {
  const eventsData = [
    {
      imageUrl: "./public/assets/placeholder.png",
      title: "Bio Hackathon",
      location: "Multi Purpose Hall",
      startTime: "10:00 AM - 4:00 PM",
      date: "November 22, Sunday",
    },
    {
      imageUrl: "./public/assets/placeholder.png",
      title: "Research Seminar",
      location: "Conference Room A",
      startTime: "1:00 PM - 5:00 PM",
      date: "November 23, Monday",
    },
    {
      imageUrl: "./public/assets/placeholder.png",
      title: "KU Hackfest",
      location: "Auditorium",
      startTime: "9:00 AM - 12:00 PM",
      date: "November 24, Tuesday",
    },
  ];
  return (
    <>
      <Header />
      <Hero />
      <div className="">
        <h2 className="text-2xl font-bold my-20 text-center">Upcoming Events</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {eventsData.map((event, index) => (
            <EventCard
              key={index}
              imageUrl={event.imageUrl}
              title={event.title}
              location={event.location}
              startTime={event.startTime} a
              date={event.date}
            />
          ))}
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


import React from 'react'
import { Header } from '@/components/ui/custom/Header'
import Footer from '@/components/footer'
import EventDetail from '@/components/ui/custom/eventDetail'
import EventCard from '@/components/ui/custom/eventcard'
import { Button } from '@/components/ui/custom/customButton'
import { Link } from 'react-router'
export default function EventDetailPage() {
  const eventsData = [
    {
      imageUrl: "./assets/placeholder.png",
      title: "Bio Hackathon",
      location: "Multi Purpose Hall",
      startTime: "10:00 AM - 4:00 PM",
      date: "November 22, Sunday",
    },
    {
      imageUrl: "./assets/placeholder.png",
      title: "Research Seminar",
      location: "Conference Room A",
      startTime: "1:00 PM - 5:00 PM",
      date: "November 23, Monday",
    },
    {
      imageUrl: "./assets/placeholder.png",
      title: "KU Hackfest",
      location: "Auditorium",
      startTime: "9:00 AM - 12:00 PM",
      date: "November 24, Tuesday",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="md:mx-auto md:w-3/4 overflow-y-auto flex-grow">
        <EventDetail className="border border-black" />
        <h2 className="text-xl font-semibold my-20 text-left md:mx-10">Other Events by: Kathmandu univerity computer club</h2>
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

      </div>
      <Footer />
    </div >

  )
}


import { Button } from "@/components/ui/custom/customButton"
// import { Icons } from "./components/icons"
// import { ArrowRight } from "lucide-react"
import EventDetail from "./components/ui/custom/eventDetail";
import Footer from "./components/ui/custom/Footer"
import { Header } from "./components/ui/custom/Header";
import EventCard from "./components/ui/custom/eventcard";
export default function Home() {
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
  const textstyle = "font-bold text-[rgb(90,90,90)] ";
  const sectionstyle = "flex sm:flex-row gap-4 align-middle items-center";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <EventDetail />
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
          <Button>More events</Button>
        </div>

      </div>
      <Footer />
    </div >

  )
}



import { Header } from "./components/ui/custom/Header";
import Hero from "./components/ui/custom/hero";
import { Button } from "./components/ui/custom/customButton";

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

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="">
        <h2 className="text-2xl font-bold my-20 text-center">Upcoming Events</h2>
        <div className="flex justify-center my-20">
        <Button>More events</Button>
        </div>
        
      </div>
    </>
    
    
  )
}


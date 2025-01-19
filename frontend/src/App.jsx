import EventCard from "./components/ui/custom/eventcard"

const App = () => {
  const handleOnClick = (eventId) => {
   alert(`Viewing details for event ${eventId}`)
  }

  const events = [
    {
      id: 1,
      imageUrl: "./src/assets/placeholder.png?height=300&width=400",
      title: "Web Development Workshop",
      location: "Multi Purpose Hall",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 22, Sunday",
    },
    {
      id: 2,
      imageUrl: "./src/assets/placeholder.png?height=300&width=400",
      title: "Web Development Workshop 2",
      location: "Multi Purpose Hall 2",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 32, Monday",
    },
    {
      id: 3,
      imageUrl: "./src/assets/placeholder.png?height=300&width=400",
      title: "Web Development Workshop 2",
      location: "Multi Purpose Hall 2",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 32, Monday",
    },
    {
      id: 4,
      imageUrl: "./src/assets/placeholder.png?height=300&width=400",
      title: "Web Development Workshop 2",
      location: "Multi Purpose Hall 2",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 32, Monday",
    },
    {
      id: 5,
      imageUrl: "./src/assets/placeholder.png?height=300&width=400",
      title: "Web Development Workshop 2",
      location: "Multi Purpose Hall 2",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 32, Monday",
    },
    {
      id: 6,
      imageUrl: "./src/assets/placeholder.png?height=300&width=400",
      title: "Web Development Workshop 2",
      location: "Multi Purpose Hall 2",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 32, Monday",
    }
  ]

  return (
      <div className="flex flex-wrap justify-center my-9 gap-9">
        {events.map((event) => (
          <EventCard
            key={event.id}
            imageUrl={event.imageUrl}
            title={event.title}
            location={event.location}
            startTime={event.startTime}
            endTime={event.endTime}
            date={event.date}
            onSeeDetails={() => handleOnClick(event.id)}
          />
        ))}
      </div>
  )
}

export default App


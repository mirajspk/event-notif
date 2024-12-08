
import EventCard from '@/components/ui/EventCard'

const App = () => {
  const handleSeeDetails = (eventId) => {
    console.log(`Viewing details for event ${eventId}`)
    // Add your logic here, e.g., navigate to event details page
  }

  const events = [
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=300&width=400",
      title: "Web Development Workshop",
      location: "Multi Purpose Hall",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      date: "November 22, Sunday",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=300&width=400",
      title: "AI and Machine Learning Seminar",
      location: "Conference Room A",
      startTime: "9:00 AM",
      endTime: "3:00 PM",
      date: "November 29, Sunday",
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg?height=300&width=400",
      title: "Data Science Bootcamp",
      location: "Virtual Meeting Room",
      startTime: "11:00 AM",
      endTime: "5:00 PM",
      date: "December 5, Saturday",
    },
    {
      id: 4,
      imageUrl: "/placeholder.svg?height=300&width=400",
      title: "UX/UI Design Workshop",
      location: "Design Studio",
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      date: "December 12, Saturday",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            imageUrl={event.imageUrl}
            title={event.title}
            location={event.location}
            startTime={event.startTime}
            endTime={event.endTime}
            date={event.date}
            onSeeDetails={() => handleSeeDetails(event.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App


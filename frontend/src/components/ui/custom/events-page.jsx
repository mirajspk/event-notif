"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { EventsFilter } from "./events-filter"
import { EventCard } from "./eventcard"
import { Button } from "@/components/ui/button"
// import {EventList} from "./eventcard"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("7days")
  const [clubFilter, setClubFilter] = useState("")

  const eventsPerPage = 9
  const totalPages = Math.ceil(events.length / eventsPerPage)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Api/events")
        setEvents(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTime =
      timeFilter === "7days"
        ? true
        : timeFilter === "30days"
          ? true
          : timeFilter === "online"
            ? event.isOnline
            : timeFilter === "free"
              ? event.isFree
              : true
    const matchesClub = clubFilter ? event.club === clubFilter : true
    return matchesSearch && matchesTime && matchesClub
  })

  const paginatedEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="w-full">
          <EventsFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            clubFilter={clubFilter}
            setClubFilter={setClubFilter}
          />
        </aside>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => (
              <EventCard
                key={event.id}
                image={event.image}
                title={event.title}
                location={event.location}
                startTime={event.startTime}
                date={event.date}
                onSeeDetails={() => console.log(`See details for ${event.title}`)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}


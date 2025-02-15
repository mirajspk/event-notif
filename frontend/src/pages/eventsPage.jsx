"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import EventcardAll from "@/components/ui/custom/eventcardAll"
import EventcardEvent from "@/components/ui/custom/eventcardEvent"
import EventcardPastEvents from "@/components/ui/custom/eventcardPastEvents"
import EventcardPastWorkshop from "@/components/ui/custom/eventcardPastWorkshop"
import EventcardSevenEvent from "@/components/ui/custom/eventcardSevenEvent"
import EventcardSevenWorkshop from "@/components/ui/custom/eventcardSevenWorkshop"
import EventcardThirtyEvent from "@/components/ui/custom/eventcardThirtyEvent"
import EventcardThirtyWorkshop from "@/components/ui/custom/eventcardThirtyWorkshop"
import EventcardWorkshop from "@/components/ui/custom/eventcardWorkshop"
import EventcardUpcomingAll from "@/components/ui/custom/eventcardUpcomingAll"
import EventcardPastAll from "@/components/ui/custom/eventcardPastAll"
import EventcardSevenAll from "@/components/ui/custom/eventcardSevenAll"
import EventcardThirtyAll from "@/components/ui/custom/eventcardThirtyAll"
import { Header } from "@/components/ui/custom/Header"
import Footer from "@/components/footer"

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Simple form state
  const [filters, setFilters] = useState({
    timeFilter: "upcoming", // Default to "All events"
    type: "both", // Default to "Both"
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events")
        setEvents(response.data)
        console.log(response.data)
        setFilteredEvents(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    if (filters.selectedClub) {
      filtered = filtered.filter((event) => event.club === filters.selectedClub)
    }

    if (filters.type === "Event") {
      filtered = filtered.filter((event) => event.isEvent)
    } else if (filters.type === "Workshop") {
      filtered = filtered.filter((event) => event.isWorkshop)
    }

    const now = new Date()
    if (filters.timeFilter === "past") {
      filtered = filtered.filter((event) => new Date(event.date) < now)
    } else if (filters.timeFilter === "7days") {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      filtered = filtered.filter((event) => new Date(event.date) >= sevenDaysAgo)
    } else if (filters.timeFilter === "30days") {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      filtered = filtered.filter((event) => new Date(event.date) >= thirtyDaysAgo)
    }

    setFilteredEvents(filtered)
  }, [events, filters])

  const handleReset = () => {
    setFilters({
      timeFilter: "upcoming",
      type: "both",
      selectedClub: "",
    })
  }

  const FilterPanel = () => (
    <Card className="w-full lg:w-72 p-4 h-fit ">
      <CardContent className="p-0">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-medium">When</h3>
            <div className="space-y-2">
              {[
                { value: "upcoming", label: "Upcoming" },
                { value: "past", label: "Past" },
                { value: "7days", label: "7 days" },
                { value: "30days", label: "30 days" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2"
                  onClick={() => setFilters({ ...filters, timeFilter: option.value })}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${filters.timeFilter === option.value ? "border-primary bg-primary" : "border-input"
                      }`}
                  >
                    {filters.timeFilter === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <Label className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Type</h3>
            <div className="space-y-2">
              {[
                { value: "both", label: "Both" },
                { value: "Event", label: "Event" },
                { value: "Workshop", label: "Workshop" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2"
                  onClick={() => setFilters({ ...filters, type: option.value })}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${filters.type === option.value ? "border-primary bg-primary" : "border-input"
                      }`}
                  >
                    {filters.type === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <Label className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-none border-[#00A8E5] text-[#00A8E5] hover:bg-[#00A8E5] hover:text-white"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>Error loading events: {error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="container mx-auto px-4 flex-grow my-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-end my-4">
          <Button
            variant={isFilterOpen ? "secondary" : "outline"}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-white"
          >
            {isFilterOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            {isFilterOpen ? "Close Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel - Mobile */}
          <div
            className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-200 ease-in-out ${isFilterOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-center">Events</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterPanel />
            </div>
          </div>

          {/* Filter Panel - Desktop */}
          <div className="hidden lg:block sticky top-4 h-fit">
            <h1 className="text-2xl font-semibold mb-4">Events</h1>
            <FilterPanel />
          </div>

          {/* Event List */}
          <div className="flex-1">
            {filters.type === "event" && filters.timeFilter === "past" && (
              <EventcardPastEvents />
            )}
            {filters.type === "workshop" && filters.timeFilter === "past" && (
              <EventcardPastWorkshop />
            )}
            {filters.type === "event" && filters.timeFilter === "7days" && (
              <EventcardSevenEvent />
            )}
            {filters.type === "workshop" && filters.timeFilter === "7days" && (
              <EventcardSevenWorkshop />
            )}
            {filters.type === "event" && filters.timeFilter === "30days" && (
              <EventcardThirtyEvent />
            )}
            {filters.type === "workshop" && filters.timeFilter === "30days" && (
              <EventcardThirtyWorkshop />
            )}
            {filters.type === "event" && filters.timeFilter === "upcoming" && (
              <EventcardEvent />
            )}
            {filters.type === "workshop" && filters.timeFilter === "upcoming" && (
              <EventcardWorkshop />
            )}
            {filters.type === "Both" && filters.timeFilter === "upcoming" && (
              <EventcardUpcomingAll />
            )}
            {filters.type === "both" && filters.timeFilter === "past" && (
              <EventcardPastAll />
            )}
            {filters.type === "both" && filters.timeFilter === "7days" && (
              <EventcardSevenAll />
            )}
            {filters.type === "both" && filters.timeFilter === "30days" && (
              <EventcardThirtyAll />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EventsPage

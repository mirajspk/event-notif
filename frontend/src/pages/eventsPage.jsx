"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import EventList from "@/components/ui/custom/eventcardAll"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Simple form state
  const [filters, setFilters] = useState({
    timeFilter: "all", // Default to "All events"
    eventType: "both", // Default to "Both"
    selectedClub: "",
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Api/events")
        setEvents(response.data)
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

    if (filters.eventType === "event") {
      filtered = filtered.filter((event) => event.isEvent)
    } else if (filters.eventType === "workshop") {
      filtered = filtered.filter((event) => event.isWorkshop)
    }

    if (filters.timeFilter === "past") {
      const now = new Date()
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
      timeFilter: "all",
      eventType: "both",
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
                { value: "all", label: "All" },
                { value: "past", label: "Past events" },
                { value: "7days", label: "Next 7 days" },
                { value: "30days", label: "Next 30 days" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2"
                  onClick={() => setFilters({ ...filters, timeFilter: option.value })}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      filters.timeFilter === option.value ? "border-primary bg-primary" : "border-input"
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
                { value: "both", label: "All" },
                { value: "event", label: "Event" },
                { value: "workshop", label: "Workshop" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2"
                  onClick={() => setFilters({ ...filters, eventType: option.value })}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      filters.eventType === option.value ? "border-primary bg-primary" : "border-input"
                    }`}
                  >
                    {filters.eventType === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <Label className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Select
            value={filters.selectedClub}
            onValueChange={(value) => setFilters({ ...filters, selectedClub: value })}
          >
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="Select Clubs" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="kucc">Computer Club (KUCC)</SelectItem>
              <SelectItem value="kurc">Robotics Club (KURC)</SelectItem>
              <SelectItem value="kucec">Civil Engineering Club (KUCEC)</SelectItem>
              <SelectItem value="kucmc">Computational Mathematics Club (KUCMC)</SelectItem>
              <SelectItem value="kuarc">Architecture Students' Club (KUARC)</SelectItem>
              <SelectItem value="ges">Geomatics Engineering Society (GES)</SelectItem>
              <SelectItem value="kubic">Biotechnology Creatives (KUBiC)</SelectItem>
              <SelectItem value="seee">Society of Electrical and Electronic Engineering (SEEE)</SelectItem>
              <SelectItem value="fop">Forum for Pharmacy (FoP)</SelectItem>
              <SelectItem value="sbis">Society of Business Information Students (SBIS)</SelectItem>
              <SelectItem value="kuaic">Artificial Intelligence Club (KUAIC)</SelectItem>
              <SelectItem value="kuigc">Indoors Games Clubs (KUIGC)</SelectItem>
              <SelectItem value="kusmc">Society of Music and Culture (KUSMC)</SelectItem>
              <SelectItem value="fecam">Forum for Environmental Conservation and Management (FECAM)</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Button
              type="button"
              className="w-full rounded-none bg-[#00A8E5] text-white hover:bg-[#0077A2]"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4">
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
            className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-200 ease-in-out ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
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
            <EventList events={filteredEvents} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default EventsPage
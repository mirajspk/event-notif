"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

// Example events data
const events = [
  { id: "1", name: "Kathmandu University", date: "Jul 15", location: "KavrepalanChowk" },
  { id: "2", name: "Pulchowk Campus", date: "Aug 20", location: "Kathmandu" },
  { id: "3", name: "Kailali Multiple Campus", date: "Sep 5", location: "Dhangadhi" },
  { id: "4", name: "Harvard College", date: "Oct 1", location: "Modern Art Museum" },
]

export default function Searchbar() {
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [isKeyboardNavigation, setIsKeyboardNavigation] = React.useState(false)
  const inputRef = React.useRef(null)

  const filteredEvents = React.useMemo(() => {
    return query
      ? events.filter(
        (event) =>
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase()),
      )
      : events
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true)
        setIsKeyboardNavigation(true)
        return
      }
    }

    if (filteredEvents.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setIsKeyboardNavigation(true)
        setSelectedIndex((prev) => (prev < filteredEvents.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setIsKeyboardNavigation(true)
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          setQuery(filteredEvents[selectedIndex].name)
          setIsOpen(false)
          setSelectedIndex(-1)
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Reset selected index when filtered results change
  React.useEffect(() => {
    setSelectedIndex(-1)
  }, [])

  const handleMouseMove = () => {
    if (isKeyboardNavigation) {
      setIsKeyboardNavigation(false)
    }
  }

  const handleMouseEnter = (index) => {
    if (!isKeyboardNavigation) {
      setSelectedIndex(index)
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 py-6 text-lg"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 w-full mt-1 rounded-md border bg-white shadow-md z-100"
          onMouseMove={handleMouseMove}
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandEmpty className="py-6 text-center text-sm">No events found.</CommandEmpty>
              <CommandGroup>
                {filteredEvents.map((event, index) => (
                  <CommandItem
                    key={event.id}
                    onSelect={() => {
                      setQuery(event.name)
                      setIsOpen(false)
                      setSelectedIndex(-1)
                    }}
                    className={`px-4 py-3 cursor-pointer ${index === selectedIndex ? "bg-gray-100 text-accent-foreground" : ""
                      }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.date} • {event.location}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}


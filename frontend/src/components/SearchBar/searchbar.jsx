'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Example events data
const events = [
  { id: '1', name: 'Kathmandu University', date: 'Jul 15', location: 'KavrepalanChowk' },
  { id: '2', name: 'Pulchowk Campus', date: 'Aug 20', location: 'Kathmandu' },
  { id: '3', name: 'Kailali multiple campus', date: 'Sep 5', location: 'Dhangadhi' },
  { id: '4', name: 'Harvard College', date: 'Oct 1', location: 'Modern Art Museum' },
]
//SearchBar components that allow users to search for events.
//display a list of events filterted by the search query.
export default function Searchbar() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const filteredEvents = React.useMemo(() => {
    if (!query) return events

    return events.filter(event =>
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full pl-10 py-6 text-lg"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty className="py-6 text-center text-sm">
                No events found.
              </CommandEmpty>
              <CommandGroup>
                {filteredEvents.map((event) => (
                  <CommandItem
                    key={event.id}
                    onSelect={() => {
                      setQuery(event.name)
                      setOpen(false)
                    }}
                    className="px-4 py-3"
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
        </PopoverContent>
      </Popover>
    </div>
  )
}


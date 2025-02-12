import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventsFilter({ searchQuery, setSearchQuery, timeFilter, setTimeFilter, clubFilter, setClubFilter }) {
  const handleReset = () => {
    setSearchQuery("")
    setTimeFilter("7days")
    setClubFilter("")
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">When</h3>
        <RadioGroup value={timeFilter} onValueChange={setTimeFilter}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="7days" id="7days" />
            <Label htmlFor="7days">Next 7 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30days" id="30days" />
            <Label htmlFor="30days">Next 30 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online">Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free">Free Entry</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Select value={clubFilter} onValueChange={setClubFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select Clubs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clubs</SelectItem>
            <SelectItem value="club1">Club 1</SelectItem>
            <SelectItem value="club2">Club 2</SelectItem>
            <SelectItem value="club3">Club 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        RESET FILTERS
      </Button>
    </div>
  )
}


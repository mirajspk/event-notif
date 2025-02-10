import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SearchFilters({ onFilterChange }) {
  const [timeFilter, setTimeFilter] = useState("7days");
  const [isOnline, setIsOnline] = useState(true);
  const [isFreeEntry, setIsFreeEntry] = useState(true);
  const [selectedClub, setSelectedClub] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleReset = () => {
    setTimeFilter("7days");
    setIsOnline(false);
    setIsFreeEntry(false);
    setSelectedClub("");
    setSearchTerm("");
    onFilterChange({
      timeFilter: "7days",
      isOnline: false,
      isFreeEntry: false,
      selectedClub: "",
      searchTerm: "",
    });
  };

  useEffect(() => {
    onFilterChange({
      timeFilter,
      isOnline,
      isFreeEntry,
      selectedClub,
      searchTerm,
    });
  }, [timeFilter, isOnline, isFreeEntry, selectedClub, searchTerm, onFilterChange]);

  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <div className="max-w-4xl mx-auto">
        <input
          type="search"
          placeholder="Search club..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-4 text-sm font-medium">When</h3>
          <RadioGroup defaultValue="7days" value={timeFilter} onValueChange={setTimeFilter}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="7days" id="7days" />
              <Label htmlFor="7days">Next 7 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30days" id="30days" />
              <Label htmlFor="30days">Next 30 days</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="online" checked={isOnline} onCheckedChange={setIsOnline} />
            <Label htmlFor="online">Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="free" checked={isFreeEntry} onCheckedChange={setIsFreeEntry} />
            <Label htmlFor="free">Free Entry</Label>
          </div>
        </div>

        <Select value={selectedClub} onValueChange={setSelectedClub}>
          <SelectTrigger>
            <SelectValue placeholder="Select Clubs" />
          </SelectTrigger>
          <SelectContent>
            {/* List of clubs */}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="w-full text-white bg-[#00A8E5]"
          onClick={handleReset}
        >
          RESET FILTERS
        </Button>
      </div>
    </div>
  );
}
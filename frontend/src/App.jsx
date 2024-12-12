import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function App() {
  return (
      <div className="px-5 py-5">
        <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select clubs" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="KUCC">Kathmandu University Computer Club (KUCC)</SelectItem>
            <SelectItem value="KUCEC">Kathmandu University Civil Engineering Club (KUCEC)</SelectItem>
            <SelectItem value="SEEE">Society of Electrical and Electronic Engineering (SEEE)</SelectItem>
            <SelectItem value="KURC">Kathmandu University Robotics Club (KURC)</SelectItem>
            <SelectItem value="KUSMC">Kathmandu University Society of Music and Culture (KUSMC)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
  )
}

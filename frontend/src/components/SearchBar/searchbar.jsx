'use client'

import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export default function Searchbar() {
  return (
    <div className="relative w-[1068px] border border-black">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search events..."
        className="w-full pl-9 h-12"
      />
    </div>
  )
}

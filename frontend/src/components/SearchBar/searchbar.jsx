'use client'

import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import SearchBarLists from './SearchBarLists'

export default function Searchbar() {
  return (

    <div className="relative w-[1068px] border border-black ml-4 z-10 mt-[50px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search events..."
        className="w-full pl-9 h-12 ring-black ring-1"
      />
      <SearchBarLists />
    </div>
  )
}

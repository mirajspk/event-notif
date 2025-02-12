import React from 'react'
import { Search, Calendar, Home } from 'lucide-react'
import FeatureCard from './FeatureCard'

const FeaturesSection = () => (
  <div className="bg-[#6B7A90] px-4 sm:px-6 lg:px-8 py-12 rounded-[2rem] -mt-16 relative z-10 mx-4 sm:mx-6 lg:mx-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        <FeatureCard
          title="Explore Clubs"
          href="/clubs"
          icon={Search}
          description="Search for clubs, societies, and organizations that match your interests."
        />
        <FeatureCard
          title="Attend Events"
          href="/events"
          icon={Calendar}
          description="Discover and participate in a wide range of events happening on campus."
        />
        <FeatureCard
          title="Schedule Event"
          icon={Home}
          href="/add_event"
          description="Keep track of your participation and achievements in various activities."
        />
      </div>
    </div>
  </div>
)

export default FeaturesSection


import React from 'react'
import { Header } from '@/components/ui/custom/Header'
import Footer from '@/components/footer'
import EventDetail from '@/components/ui/custom/eventDetail'
import EventCard from '@/components/ui/custom/eventcard'
import { Button } from '@/components/ui/custom/customButton'
import EventcardThree from '@/components/ui/custom/eventcardThree'

export default function EventDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="md:mx-auto md:w-3/4 overflow-y-auto flex-grow">
        <EventDetail className="border border-black" />
        <h2 className="text-xl font-semibold my-20 text-left md:mx-10">Other Events :</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <EventcardThree />
        </div>
        <div className="flex justify-center my-20">
          <Button>More events</Button>
        </div>

      </div>
      <Footer />
    </div >

  )
}


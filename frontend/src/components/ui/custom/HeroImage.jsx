import React from 'react'
import Searchbar from '@/components/SearchBar/searchbar'

const HeroImage = () => (
  <div className="relative w-3/4 h-[600px] mx-auto">
    <div className="absolute w-full max-w-md md:max-w-lg lg:max-w-xl px-4 mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Searchbar />
    </div>
    <img
      src="/assets/KU_photo.png"
      alt="University"
      className="w-full h-full object-cover"
    />
  </div>
)

export default HeroImage

import React from 'react'
import HeroImage from './HeroImage'
import FeaturesSection from './FeaturesSection'

const Hero = () => (
  <div className="bg-white">
    <div className="relative w-full">
      <div className="relative w-full">
        <HeroImage />
      </div>
      <FeaturesSection />
    </div>
  </div>
)

export default Hero


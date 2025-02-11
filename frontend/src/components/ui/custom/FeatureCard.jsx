import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

const FeatureCard = ({ title, href, icon: Icon, description }) => (
  <Card className="bg-white p-6 sm:p-8 flex flex-row items-start text-left mb-4 lg:mb-0 flex-1">
    <div className="mr-4 mt-1">
      <Icon className="h-8 w-8 text-gray-700" />
    </div>
    <CardContent className="flex-1 p-0">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={`${href}`}
        className="text-[#00A8E5] underline-offset-4 hover:underline inline-flex items-center justify-start"
      >
        GET STARTED →
      </a>
    </CardContent>
  </Card >
)

export default FeatureCard


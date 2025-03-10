import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router'

const EventCard = ({
  imageUrl,
  title,
  location,
  startTime,
  endTime,
  date,
  onSeeDetails
}) => {
  return (
    <Card className="sm:w-[350px] lg:w-[380px] h-[450px] flex flex-col gap-2"> {/* Added mx-2 for left and right margins */}
      <div className="h-48">
        <img
          src={imageUrl}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="flex-grow flex flex-col justify-between p-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold leading-tight">
            {title}
          </h2>
          <div className="space-y-3 text-black">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{startTime} - {endTime}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <a key={title} href={`/Events/${title}`}>
        <CardFooter className="p-4">
          <a
            className="w-full border border-primary text-primary bg-white hover:bg-primary hover:text-white h-10 px-4 py-2 inline-flex items-center justify-center text-sm font-medium transition-colors cursor-pointer"
            onClick={onSeeDetails}
          >
            SEE DETAILS

          </a>
        </CardFooter>
      </a>
    </Card >
  )
}

export default EventCard


import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from 'lucide-react'

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
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg?height=300&width=400"}
          alt="Event space"
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="flex-grow pt-6 space-y-4">
        <h2 className="text-xl font-semibold leading-tight line-clamp-2">
          {title}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-muted-foreground/70 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5 text-muted-foreground/70 flex-shrink-0" />
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-5 h-5 text-muted-foreground/70 flex-shrink-0" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 pb-6">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onSeeDetails}
        >
          SEE DETAILS
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EventCard


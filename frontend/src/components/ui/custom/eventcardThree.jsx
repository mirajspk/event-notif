import { useState, useEffect } from "react"; 
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from 'lucide-react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

// This component renders single event card and defines on How it should look like
const EventCard = ({ 
  image, 
  title, 
  location, 
  startTime, 
  date, 
  onSeeDetails,
}) => {
  return (
    <Card className="w-[350px] h-[400px] flex flex-col"> {/* Scaled down the card size */}
      <div className="h-40"> {/* Scaled down the image height */}
        <img
          src={image}
          className="object-cover w-full h-full"
          alt={title} // Added alt attribute for accessibility
        />
      </div>
      <CardContent className="flex-grow flex flex-col justify-between p-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold leading-tight"> {/* Scaled down the title font size */}
            {title}
          </h2>
          <div className="space-y-3 text-black">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" /> {/* Scaled down the icon size */}
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" /> {/* Scaled down the icon size */}
              <span> {startTime} </span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" /> {/* Scaled down the icon size */}
              <span>{date}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <button
          className="w-full border border-primary text-primary bg-white hover:bg-primary hover:text-white h-8 px-3 py-1 inline-flex items-center justify-center text-sm font-medium transition-colors cursor-pointer"
          onClick={onSeeDetails} // Use onClick to handle details view
        >
          SEE DETAILS
        </button>
      </CardFooter>
    </Card>
  );
};

// This component stores the list of the Events from the API 
const EventList = () => {
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  //useEffect 
  //It is used to define the side effects(fetching, subscriptions)
  //After calling useEffect pass it a function that contains side effect 
  //it takes 2 argument 1: function 
  //2: empty depenndency array [] <which implies effect will only run once>
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //uses get Http methode from our backend Api
        const response = await axios.get('http://127.0.0.1:8000/api/events');
        const today = new Date(); // Get today's date
        const futureEvents = response.data.filter(event => new Date(event.date) > today); // Filter events that are in the future
        const sortedEvents = futureEvents
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
          .slice(0, 3); // Get the first 3 events
        setEvents(sortedEvents); // Update state

      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchEvents(); 
  }, []); 

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error.message}</div>; 

  return (
    <div className="flex flex-wrap justify-center gap-6"> 
      {events.map(event => (
        <div key={event.id} className="mb-6"> 
          <EventCard 
            image ={event.image}
            title={event.name}
            location={event.location}
            startTime={event.startTime}
            date={event.date}
            onSeeDetails={() => navigate(`/events/${event.id}`)} // Use the navigate function
          />
        </div>
      ))}
    </div>
  );
};

export default EventList;
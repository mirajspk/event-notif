import { useState, useEffect } from "react"; 
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from 'lucide-react';
import axios from 'axios'; // Import axios for making HTTP requests

//This component renders single event card and defines on How it should look like
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
    <Card className="w-[400px] h-[450px] flex flex-col">
      <div className="h-48">
        <img
          src={imageUrl}
          className="object-cover w-full h-full"
          alt={title} // Added alt attribute for accessibility
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
      <CardFooter className="p-4">
        <button
          className="w-full border border-primary text-primary bg-white hover:bg-primary hover:text-white h-10 px-4 py-2 inline-flex items-center justify-center text-sm font-medium transition-colors cursor-pointer"
          onClick={onSeeDetails} // Use onClick to handle details view
        >
          SEE DETAILS
        </button>
      </CardFooter>
    </Card>
  );
};

//This component stores the list of the Events from the Api 
const EventList = () => {
  //useState:
  //After initializing useState, It returns array with 2 elements:
  // current state variable=> events
  // function to update state=> setEvents
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  //useEffect 
  //It is used to define the side effects(fetching, subscriptions)
  //After calling useEffect pass it a function that contains side effect 
  //it takes 2 argument 1: function 
  //2: empty depenndency array [] <which implies effect will only run once>
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //uses get Http methode from our backend Api
        const response = await axios.get('http://127.0.0.1:8000/Api/events');
        setEvents(response.data); // Set the events data
      } catch (err) {
        setError(err); // Set error if the request fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvents(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error.message}</div>; // Error state

//Creates the event card for the Information stored form backend
  return (
    <div className="flex flex-wrap justify-center gap-6"> {/* Added gap-6 for spacing */}
      {events.map(event => (
        <div key={event.id} className="mb-6"> {/* Added margin-bottom for spacing */}
          <EventCard 
            imageUrl={event.imageUrl}
            title={event.title}
            location={event.location}
            startTime={event.startTime}
            endTime={event.endTime}
            date={event.date}
            onSeeDetails={() => console.log(`See details for ${event.title}`)} // Placeholder for details function
          />
        </div>
      ))}
    </div>
  );
};

export default EventList;

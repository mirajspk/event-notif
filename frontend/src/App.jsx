//Importing routers and pageNotfound page
import { Route,  Routes } from "react-router-dom"
import EventCard from "./components/ui/custom/eventcard"
import PageNotFound from"./components/pageNotFound"

//This is the functional component of the App 
const App = () => {
  //When The eventcard is clicked it will trigger alert 
  const handleOnClick = (eventId) => {
    alert(`Viewing details for event ${eventId}`)
  }

  //Array which holds The values of the event details
  const events = [ ]

  //Return defines Which component will get rendered
  return (
    <div className="flex flex-wrap justify-center my-9 gap-9">
      {events.map((event) => (
        <EventCard
          key={event.id}
          image ={event.image}
          name={event.name}
          location={event.location}
          startTime={event.startTime}
          date={event.date}
          onSeeDetails={() => handleOnClick(event.id)}
        />
      ))}
      <Routes>
        <Route path="/events" element={<EventCard /> } />
        <Route path="*" element={<PageNotFound /> } />
      </Routes>
    </div>
  )  
}

export default App


//Importing routers and pageNotfound page
import { Route,  Routes } from "react-router-dom"

import EventcardAll from "./components/ui/custom/eventcardAll"
import EventcardPastEvent from "./components/ui/custom/eventcardPastEvents"
import EventcardPastWorkshop from "./components/ui/custom/eventcardPastWorkshop"
import EventcardSevenEvent from "./components/ui/custom/eventcardSevenEvent"
import EventcardSevenWorkshop from "./components/ui/custom/eventcardSevenWorkshop"
import EventcardThirtyEvent from "./components/ui/custom/eventcardThirtyEvent"
import EventcardThirtyWorkshop from "./components/ui/custom/eventcardThirtyWorkshop"
import ThreeEvent from "./components/ui/custom/eventcardThree"

import ClubPage from "./components/ui/custom/ClubPage"
import Club from "./components/ui/custom/Club"
import PageNotFound from"./components/pageNotFound"
import LoginForm from "./components/login"
import SignUpForm from "./components/signup"


import { Button } from "@/components/ui/custom/customButton"
// import { Icons } from "./components/icons"
// import { ArrowRight } from "lucide-react"
import EventDetail from "./components/ui/custom/eventDetail"


//This is the functional component of the App 
const App = () => {
  return (
    <div className="flex flex-wrap justify-center my-9 gap-9">
      <Routes>
        <Route path="/events" element={<EventcardAll/> } />
        <Route path="/club" element={<Club/>}/>
        <Route path="/clubpage" element={<ClubPage/>}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/events/:id" element={<EventDetail />} />


        <Route path="/pastworkshop" element={<EventcardPastWorkshop/> } />
        <Route path="/pastevent" element={<EventcardPastEvent/> } />
        <Route path="/eventseven" element={<EventcardSevenEvent/> } />
        <Route path="/workshopseven" element={<EventcardSevenWorkshop/> } />
        <Route path="/eventthirty" element={<EventcardThirtyEvent/> } />
        <Route path="/workshopthirty" element={<EventcardThirtyWorkshop/> } />
        <Route path="/three" element={<ThreeEvent/> } />
      </Routes>
    </div>
  )  
}

export default App

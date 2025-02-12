//Importing routers and pageNotfound page
import { Route,  Routes } from "react-router-dom"
import EventsPage from "./pages/eventsPage"

import EventList from "./components/ui/custom/eventcardAll"
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
        <Route path="/events" element={<EventList /> } />
        <Route path="/club" element={<Club/>}/>
        <Route path="/clubpage" element={<ClubPage/>}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        <Route path="*" element={<PageNotFound /> } />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </div>
  )  
}

export default App

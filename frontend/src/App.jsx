//Importing routers and pageNotfound page
import { Route,  Routes } from "react-router-dom"
import EventList from "./components/ui/custom/eventcard"
import ClubPage from "./components/ui/custom/ClubPage"
import Club from "./components/ui/custom/Club"
import PageNotFound from"./components/pageNotFound"
import LoginForm from "./components/login"
import SignUpForm from "./components/signup"
import { Button } from "@/components/ui/custom/customButton"
// import { Icons } from "./components/icons"
// import { ArrowRight } from "lucide-react"
import EventDetail from "./components/ui/custom/eventDetail"
import Footer from "./components/ui/custom/Footer"
import { Header } from "./components/ui/custom/Header"
import EventListThree from "./components/ui/custom/eventcardThree"


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
        <Route path="/recentevent" element={<EventListThree /> } />
        <Route path="eventdetails" element={<EventDetail />} />
      </Routes>
    </div>
  )  
}

export default App

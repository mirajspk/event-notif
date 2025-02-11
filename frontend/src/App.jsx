//Importing routers and pageNotfound page
import { Route,  Routes } from "react-router-dom"
import EventList from "./components/ui/custom/eventcard"
import ClubPage from "./components/ui/custom/ClubPage"
import Club from "./components/ui/custom/Club"
import PageNotFound from"./components/pageNotFound"

//This is the functional component of the App 
const App = () => {
  return (
    <div className="flex flex-wrap justify-center my-9 gap-9">
      <Routes>
        <Route path="/events" element={<EventList /> } />
        <Route path="/club" element={<Club/>}/>
        <Route path="/clubpage" element={<ClubPage/>}/>
        <Route path="*" element={<PageNotFound /> } />
      </Routes>
    </div>
  )  
}

export default App

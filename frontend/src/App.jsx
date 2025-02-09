<<<<<<< HEAD
//Importing routers and pageNotfound page
import { Route,  Routes } from "react-router-dom"
import EventList from "./components/ui/custom/eventcard"
import PageNotFound from"./components/pageNotFound"
import NumberEvents from "./components/ui/custom/totalNumberOfEvents.jsx"

//This is the functional component of the App 
const App = () => {
  return (
    <div className="flex flex-wrap justify-center my-9 gap-9">
      <Routes>
        <Route path="/events" element={<EventList /> } />
        <Route path="/total" element={<NumberEvents /> } />
        <Route path="*" element={<PageNotFound /> } />
      </Routes>
    </div>
  )  
=======

import { Header } from "./components/ui/custom/Header"


export default function App() {
  return (
    <>
      <Header></Header>
    </>
    
    
  )
>>>>>>> origin/feature/header
}

export default App


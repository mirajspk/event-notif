import { Button } from "@/components/ui/custom/customButton"
// import { Icons } from "./components/icons"
// import { ArrowRight } from "lucide-react"
import EventDetail from "./components/ui/custom/eventDetail";
import Footer from "./components/ui/custom/Footer"
import { Header } from "./components/ui/custom/Header";
import EventList from "./components/ui/custom/eventcardThree";

const App = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="md:mx-auto md:w-3/4 overflow-y-auto flex-grow">
        <EventDetail className="border border-black" />
        <h2 className="text-xl font-semibold my-20 text-left md:mx-10">Other Events You Might Be interested: </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <EventList />
        </div>
        <div className="flex justify-center my-20">
          <Button>More events</Button>
        </div>

      </div>
      <Footer />
    </div >

  )
}

export default App

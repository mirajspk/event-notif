import { Button } from "@/components/ui/button"
import { Icons } from "./components/icons"
import { ArrowRight } from "lucide-react"
import Footer from "./components/footer/Footer"
import Searchbar from "./components/SearchBar/searchbar"
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/homepage"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mt-[60px]">
      <main className="flex-grow">
        <Homepage />
      </main>
      <Footer />
    </div>

  )
}

import { Button } from "@/components/ui/button"
import { Icons } from "./components/icons"
import { ArrowRight } from "lucide-react"
export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-2 mx-10 my-10">
      <Button>SIGN IN</Button>
      <Button variant = "outline">SEE DETAILS</Button>
      <Button variant = "ghost">LOGIN</Button>
      <Button variant="icon">
        <Icons.google />Google
      </Button>
      <Button variant="icon">
        <Icons.apple />Apple
      </Button>
      <Button variant="link">
        GET STARTED
        <ArrowRight/>
      </Button>

    </div>
  )
}

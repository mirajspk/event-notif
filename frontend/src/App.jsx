import { Button } from "@/components/ui/button"
import { Icons } from "./components/icons"
export default function Home() {
  return (
    <div>
      <Button>SIGN IN</Button>
      <Button variant = "outline">SEE DETAILS</Button>
      <Button variant = "ghost">SIGN IN</Button>
      <Button variant="outline" className="bg-white text-black border-black rounded-md px-14">
        <Icons.google />Google
      </Button>
      <Button variant="outline" className="bg-white text-black border-black rounded-md px-14">
        <Icons.apple />Apple
      </Button>
    </div>
  )
}

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function App() {
  return (
  <RadioGroup defaultValue="option-one">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-one" id="option-one" />
      <Label htmlFor="option-one">Next 7 days</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-two" id="option-two" />
      <Label htmlFor="option-two">Next 30 days</Label>
    </div>
  </RadioGroup>
  )
}



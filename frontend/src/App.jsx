import LoginForm from "./components/login"
import SignUpForm from "./components/signup"
import { Header } from "./components/ui/custom/Header"

export default function Home() {
  return (
    <div>
      <Header></Header>
      <LoginForm></LoginForm>
      <SignUpForm></SignUpForm>
    </div>
  )
}

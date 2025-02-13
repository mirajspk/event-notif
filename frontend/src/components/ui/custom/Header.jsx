import { useState } from "react"
import { Button } from "@/components/ui/custom/customButton"
import { Link, NavLink } from "react-router"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Clubs", href: "/clubs" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <span className="text-2xl font-semibold cursor-default">KUevents</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => isActive ? "text-gray-800" : "text-gray-400 hover:text-gray-900 transition-colors"}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a href="/login">
            <Button>LOG IN</Button>
          </a>
          <Button
            variant="menu"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bx bx-menu text-2xl"></i>
          </Button>
        </div>
      </div>

      {
        isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4 items-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-900 transition-colors "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )
      }
    </header >
  )
}

export { Header }


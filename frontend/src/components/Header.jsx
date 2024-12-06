import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

const navItems = [
  { name: "Home", href: "#" },
  { name: "Events", href: "#" },
  { name: "Clubs", href: "#" },
  { name: "Contact", href: "#" },
  { name: "About", href: "#" },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-2xl font-semibold cursor-default">KUevents</span>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button>Sign In</Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export { Header }


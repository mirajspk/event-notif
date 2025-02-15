import { useState } from "react";
import { Button } from "@/components/ui/custom/customButton";
import { Link, NavLink } from "react-router";
import { useAuth } from "@/context/auth-context";
import Cookies from 'js-cookie';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Clubs", href: "/clubs" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Remove cookies using js-cookie
      Cookies.remove('access_token', { path: '/', sameSite: 'None', secure: true });
      Cookies.remove('access_token', { path: '/', domain: '127.0.0.1' })
      Cookies.remove('refresh_token', { path: '/', sameSite: 'None', secure: true });
      Cookies.remove('isAuthenticated', { path: '/', sameSite: 'None', secure: true });
      window.location.reload();
      await logout();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

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
              className={({ isActive }) =>
                isActive ? "text-gray-800" : "text-gray-400 hover:text-gray-900 transition-colors"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">

          {isAuthenticated ? (
            <>
              <Button className="bg-white text-gray underline-offset-2 border hover:cursor-pointer hover:bg-gray-300">EDIT</Button>
              <Button onClick={handleLogout}>LOG OUT</Button>
            </>
          ) : (
            <a href="/login">
              <Button>LOG IN</Button>
            </a>
          )}
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

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export { Header };

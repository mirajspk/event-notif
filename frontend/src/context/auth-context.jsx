import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Install with `npm install js-cookie`

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Cookies.get('isAuthenticated') === 'true'; // Read from cookies
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/check', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to check auth status');
      }

      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        Cookies.set('isAuthenticated', 'true', {
          expires: 1,
          sameSite: 'None',
          secure: true
        });
      } else {
        Cookies.remove('isAuthenticated');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      Cookies.remove('isAuthenticated'); // Clear auth state
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      setIsAuthenticated(true);
      Cookies.set('isAuthenticated', 'true', {
        expires: 1,
        sameSite: 'None',
        secure: true
      });
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setIsAuthenticated(false);
      Cookies.remove('isAuthenticated'); // Clear cookie on logout
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

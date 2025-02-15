import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Install with `npm install js-cookie`
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Cookies.get('isAuthenticated') === 'true';
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      let accessToken = Cookies.get('access_token');

      if (!accessToken) {
        console.log('No access token found, trying to refresh...');
        accessToken = await refreshAccessToken();
      }

      if (!accessToken) {
        console.error('Auth check failed: No valid access token');
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/auth/check', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true, // Ensure cookies are sent
      });

      setIsAuthenticated(response.data.authenticated);
      if (response.data.authenticated) {
        Cookies.set('isAuthenticated', 'true', {
          expires: 1,
          sameSite: 'Lax',
          secure: false,
        });
      } else {
        Cookies.remove('isAuthenticated');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      Cookies.remove('isAuthenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/refresh/',
        {},
        { withCredentials: true }
      );

      const newAccessToken = response.data.access;
      Cookies.set('access_token', newAccessToken, {
        expires: 1,
        sameSite: 'Lax',
        secure: false,
      });

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        { username, password },
        { withCredentials: true }
      );

      setIsAuthenticated(true);
      Cookies.set('access_token', response.data.access, {
        expires: 1,
        sameSite: 'Lax',
        secure: false,
      });
      Cookies.set('isAuthenticated', 'true', {
        expires: 1,
        sameSite: 'Lax',
        secure: false,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        console.error('No access token found, logging out anyway');
      } else {
        await axios.post(
          'http://127.0.0.1:8000/api/auth/logout/',
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      }

      // Clear cookies and storage
      Cookies.remove('access_token', { path: '/' });
      Cookies.remove('refresh_token', { path: '/' });
      Cookies.remove('isAuthenticated', { path: '/' });

      localStorage.clear();
      sessionStorage.clear();
      setIsAuthenticated(false);
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error.message);
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

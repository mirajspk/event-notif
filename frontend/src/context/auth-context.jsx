import { createContext, useContext, useState, useEffect } from 'react';

/**                                                                                      
 * AuthContext provides authentication state and methods to its consumers.               
 */
const AuthContext = createContext(null);

/**                                                                                      
 * AuthProvider component that wraps its children with AuthContext.Provider.             
 * It manages authentication state and provides login and logout methods.                
 *                                                                                       
 *  {Object} props - The component props.                                          
 *  {React.ReactNode} props.children - The children components.                    
 */
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**                                                                                    
   * Checks the authentication status by making an API call.                             
   */
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
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**                                                                                    
   * Logs in the user by making an API call with the provided email and password.        
   */
  const login = async (email, password) => {
    console.log('Attempting login with:', email, password);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for sending cookies
      });

      console.log('Response received:', response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(errorData.error || 'Login failed');
      }

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  /*                                                                                    
   * Logs out the user by making an API call.                                            
   */
  const logout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setIsAuthenticated(false);
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

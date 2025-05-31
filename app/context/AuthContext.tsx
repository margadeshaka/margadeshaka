'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the user data type
interface UserData {
  name: string;
  // Add more user properties as needed
}

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: () => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userData: null,
  login: () => {},
  logout: () => {},
});

// Custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Check for existing auth session on mount
  useEffect(() => {
    // This would be replaced with actual MSAL.js implementation
    const checkAuthStatus = () => {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        try {
          const authData = JSON.parse(savedAuth);
          setIsAuthenticated(true);
          setUserData(authData.userData);
        } catch (e) {
          console.error('Error parsing auth data from localStorage', e);
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Mock login function (to be replaced with actual MSAL.js implementation)
  const login = () => {
    // Simulate successful login
    const userData = { name: 'User' };
    setIsAuthenticated(true);
    setUserData(userData);
    
    // Save to localStorage
    localStorage.setItem('auth', JSON.stringify({ 
      isAuthenticated: true,
      userData
    }));
  };

  // Mock logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userData, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
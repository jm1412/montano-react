import React, { createContext, useState, useEffect } from "react";

// Context for managing authentication state across the app
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for an existing token to determine if user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle user login
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  // Provide authentication state and actions to the rest of the app
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

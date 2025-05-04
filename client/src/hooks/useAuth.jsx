import { createContext, useContext, useEffect, useState } from "react";
import { checkUser, loginUser, logoutUser } from "../api/authApi.js";  // Adjust for your login function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await checkUser();
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await loginUser(username, password); 
      setUser(res.data);
      setIsAuthenticated(true); 
    } catch (err) {
      console.error("Login failed", err);
      setIsAuthenticated(false); 
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

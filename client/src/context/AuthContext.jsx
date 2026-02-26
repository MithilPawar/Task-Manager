import { createContext, useEffect, useState } from "react";
import { checkUser, loginUser, logoutUser } from "../api/authApi.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await checkUser();
      setUser(res.data);
      setIsAuthenticated(true);
    } catch {
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
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

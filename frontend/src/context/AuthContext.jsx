import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // ✅ Verify saved token on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const localUser = localStorage.getItem("user");

        if (!localUser) {
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(localUser);

        // profile API hit to verify token
        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });

        // keep old token + fresh profile data
        const updatedUser = {
          ...parsedUser,
          ...res.data,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.log("Token invalid or expired");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register
  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  };

  // Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
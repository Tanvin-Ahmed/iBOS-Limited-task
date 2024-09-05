import { User } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the structure of the AuthContext
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

// Create the default context with dummy values (will be overwritten by provider)
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // if already authenticated then after reload auth info will get form session storage
  useEffect(() => {
    const str = sessionStorage.getItem("user");

    if (str?.trim()) {
      setUser(JSON.parse(str) as User);
    }
  }, []);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

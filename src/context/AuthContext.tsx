// AuthContext.tsx
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

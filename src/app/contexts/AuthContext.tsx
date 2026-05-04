import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const savedEmail = localStorage.getItem("managerEmail");

    if (savedEmail === email) {
      return { success: false, error: "Manager account already exists" };
    }

    localStorage.setItem("managerEmail", email);
    localStorage.setItem("managerPassword", password);

    return { success: true };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const savedEmail = localStorage.getItem("managerEmail");
    const savedPassword = localStorage.getItem("managerPassword");

    if (email === savedEmail && password === savedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

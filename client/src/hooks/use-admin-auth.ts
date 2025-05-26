import { useState, useEffect } from "react";

interface AdminUser {
  id: number;
  username: string;
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminAuth = localStorage.getItem("adminAuth");
        if (adminAuth) {
          const userData = JSON.parse(adminAuth);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error parsing admin auth:", error);
        localStorage.removeItem("adminAuth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: AdminUser) => {
    localStorage.setItem("adminAuth", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

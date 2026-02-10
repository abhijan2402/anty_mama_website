"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  isVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  handleAuth: (res: any) => void;
  updateUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "anty_mama_tkn";
const USER_KEY = "anty_mama_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  /* 🔁 SYNC FROM LOCALSTORAGE ON APP LOAD */
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /* ✅ HANDLE LOGIN / SIGNUP RESPONSE */
  const handleAuth = (res: any) => {
    console.log("AUTH RESPONSE:", res);

    if (!res?.token) return;

    const token = res.token;

    // remove token from user object
    const { token: _, ...user } = res;

    setToken(token);
    setUser(user);

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // optional redirect
    window.location.href = "/login";
  };


  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuth,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* 🪝 HOOK */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

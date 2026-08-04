import { createContext, useContext, useEffect, useState } from "react";

import { loginUser } from "../api/authApi";

import {
  saveToken,
  saveUser,
  getToken,
  getUser,
  clearAuth,
} from "../services/tokenService";

const AuthContext = createContext();

/*
========================
AUTH PROVIDER
========================
*/

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  /*
  ========================
  RESTORE LOGIN
  ========================
  */

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  /*
  ========================
  LOGIN
  ========================
  */

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    saveToken(data.token);
    saveUser(data.user);

    setUser(data.user);

    return data;
  };

  /*
  ========================
  LOGOUT
  ========================
  */

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  /*
  ========================
  CONTEXT VALUE
  ========================
  */

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/*
========================
CUSTOM HOOK
========================
*/

export const useAuth = () => {
  return useContext(AuthContext);
};
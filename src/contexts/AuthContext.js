'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { register as apiRegister, login as apiLogin, fetchUserProfile } from '../lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Keep localStorage in sync with state
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // On mount, verify token and user
  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchUserProfile(token)
      .then((profile) => {
        setUser(profile);
        setIsLoading(false);
      })
      .catch((err) => {
        // Only clear user if unauthorized
        if (err?.response?.status === 401) {
          setUser(null);
          setToken(null);
        }
        setIsLoading(false);
      });
  }, [token]);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const { token: newToken, user: newUser } = await apiLogin(credentials);
      setToken(newToken);
      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const data = await apiRegister(userData);
      setIsLoading(false);
      return { success: true, data };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Allow manual refresh of user profile
  const refreshUser = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const profile = await fetchUserProfile(token);
      setUser(profile);
    } catch (err) {
      if (err?.response?.status === 401) {
        setUser(null);
        setToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user && !!token,
    token,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
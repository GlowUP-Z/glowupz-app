'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AvatarConfig, ClothingItem, Look } from '@/lib/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string) => Promise<boolean>;
  updateAvatar: (avatar: AvatarConfig) => void;
  addClothingItem: (item: ClothingItem) => void;
  removeClothingItem: (id: string) => void;
  addLook: (look: Look) => void;
  removeLook: (id: string) => void;
  toggleFavoriteLook: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAvatar: AvatarConfig = {
  gender: 'female',
  bodyType: 'athletic',
  height: 170,
  skinTone: 'medium'
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('glowupz-user');
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('glowupz-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('glowupz-user');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção, conectar com backend real
    const savedUsers = localStorage.getItem('glowupz-users');
    const users = savedUsers ? JSON.parse(savedUsers) : {};
    
    if (users[email] && users[email].password === password) {
      const userData: User = {
        id: email,
        email,
        avatar: users[email].avatar || defaultAvatar,
        wardrobe: users[email].wardrobe || [],
        looks: users[email].looks || [],
        preferences: users[email].preferences || {
          language: 'pt',
          notifications: {
            weeklyLooks: true,
            weatherAlerts: true
          }
        }
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    // Simulação de registro - em produção, conectar com backend real
    const savedUsers = localStorage.getItem('glowupz-users');
    const users = savedUsers ? JSON.parse(savedUsers) : {};
    
    if (users[email]) {
      return false; // Usuário já existe
    }

    users[email] = {
      password,
      avatar: defaultAvatar,
      wardrobe: [],
      looks: [],
      preferences: {
        language: 'pt',
        notifications: {
          weeklyLooks: true,
          weatherAlerts: true
        }
      }
    };

    localStorage.setItem('glowupz-users', JSON.stringify(users));

    const userData: User = {
      id: email,
      email,
      avatar: defaultAvatar,
      wardrobe: [],
      looks: [],
      preferences: {
        language: 'pt',
        notifications: {
          weeklyLooks: true,
          weatherAlerts: true
        }
      }
    };
    setUser(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateAvatar = (avatar: AvatarConfig) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
    }
  };

  const addClothingItem = (item: ClothingItem) => {
    if (user) {
      const updatedUser = {
        ...user,
        wardrobe: [...user.wardrobe, item]
      };
      setUser(updatedUser);
    }
  };

  const removeClothingItem = (id: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        wardrobe: user.wardrobe.filter(item => item.id !== id)
      };
      setUser(updatedUser);
    }
  };

  const addLook = (look: Look) => {
    if (user) {
      const updatedUser = {
        ...user,
        looks: [...user.looks, look]
      };
      setUser(updatedUser);
    }
  };

  const removeLook = (id: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        looks: user.looks.filter(look => look.id !== id)
      };
      setUser(updatedUser);
    }
  };

  const toggleFavoriteLook = (id: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        looks: user.looks.map(look =>
          look.id === id ? { ...look, favorite: !look.favorite } : look
        )
      };
      setUser(updatedUser);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateAvatar,
        addClothingItem,
        removeClothingItem,
        addLook,
        removeLook,
        toggleFavoriteLook
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

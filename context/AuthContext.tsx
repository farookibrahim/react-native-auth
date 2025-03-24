import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the types for the user
interface User {
  name: string;
  email: string;
  password: string;
}

// Define the AuthContext state
interface AuthContextType {
  user: User | null;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuthError: (message: string) => void;
  isLoggedIn: () => Promise<boolean>;
}

// Initialize the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContext Provider
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Load user session from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserSession = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUserSession();
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    const usersData = await AsyncStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
      const match = foundUser.password === password;
      if (match) {
        setUser(foundUser);
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        setAuthError('Invalid email or password.');
      }
    } else {
      setAuthError('Invalid email or password.');
    }
  };

  // Signup user
  const signup = async (name: string, email: string, password: string) => {
    const usersData = await AsyncStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const userExists = users.some(user => user.email === email);
    if (userExists) {
      setAuthError('Email is already registered.');
      return;
    }

    const newUser: User = { name, email, password };
    users.push(newUser);

    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Logout user
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  // Check if the user is logged in
  const isLoggedIn = async (): Promise<boolean> => {
    const storedUser = await AsyncStorage.getItem('user');
    return storedUser !== null;
  };

  return (
    <AuthContext.Provider value={{ user, authError, login, signup, logout, setAuthError, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

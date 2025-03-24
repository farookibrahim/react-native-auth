import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    // Check if the user is logged in when the screen loads
    const checkLoginStatus = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        // If not logged in, navigate to Login screen
        router.replace('/login');
      }
    };

    checkLoginStatus();
  }, [router, isLoggedIn]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    router.replace('/login');  // After logout, navigate to Login screen
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Welcome, {user.name}!</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  email: {
    fontSize: 18,
    color: '#777',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#aaa',
  },
});

export default HomeScreen;

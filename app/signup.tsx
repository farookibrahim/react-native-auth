import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import { validateEmail, validatePassword } from '@/utils/validators';

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const { signup, authError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleNameChange = (text: string) => {
    setName(text);
    if (nameError) setNameError('');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleSignup = async () => {
    let isValid = true;

    // Validate name
    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      isValid = false;
    }

    if (!isValid) return; // Stop if validation fails

    try {
      await signup(name, email, password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Signup Failed', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.heading}>Sign Up</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!isPasswordVisible}
            />
            <View style={styles.eyeIconWrapper}>
              <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {authError && <Text style={styles.errorText}>{authError}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  formWrapper: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 12,
  },
  inputPasswordWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  eyeIconWrapper: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#eb3942',
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 16,
  },
  footerLink: {
    color: '#e50914',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignupScreen;

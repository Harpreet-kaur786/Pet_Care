import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import { auth, db, createUserWithEmailAndPassword, collection, addDoc } from '../../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Full name is required.");
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format. Example: user@gmail.com");
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number.");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("Password must contain at least one special character (!@#$%^&*).");
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name,
        email,
        profilePicture: 'https://example.com/default-profile.png',
      });
      setIsLoading(false);
      navigation.navigate('PetSelection');
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setEmailError("This email is already in use.");
      } else {
        setEmailError(error.message);
      }
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/pexels-basharkadi-2569498.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to Pet Care App</Text>
          <Avatar.Icon size={80} icon="account-circle" style={styles.avatar} />

          <TextInput 
            label="Full Name" 
            value={name} 
            onChangeText={setName} 
            style={styles.input} 
            mode="outlined" 
            error={!!nameError}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <TextInput 
            label="Email" 
            value={email} 
            onChangeText={setEmail} 
            style={styles.input} 
            mode="outlined" 
            keyboardType="email-address"
            error={!!emailError}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput 
            label="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            style={styles.input} 
            mode="outlined"
            error={!!passwordError}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Button 
            mode="contained" 
            onPress={handleSignup} 
            style={styles.button}
            loading={isLoading}
            disabled={isLoading}
          >
            Sign Up
          </Button>

          <View style={styles.links}>
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Already have an account? Log in
            </Text>
            {/* <Text style={styles.link} onPress={() => navigation.navigate('PetSelection')}>
              Want to register another pet? Pet Registration
            </Text> */}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Light white overlay
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#50C4A3',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 15,
    backgroundColor: '#50C4A3',
  },
  links: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#0066cc',
    marginTop: 5,
    fontWeight: '900',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 4,
  },
});

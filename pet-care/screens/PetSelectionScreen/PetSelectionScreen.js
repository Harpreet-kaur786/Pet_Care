
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, RadioButton, Divider } from 'react-native-paper';
import { auth, db, collection, addDoc } from '../../firebaseConfig';

export default function PetRegistrationScreen({ navigation }) {
  // State hooks for form fields
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false); 

  // Registration handler for logged-in users
  const handleRegisterPet = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Not Logged In", "You must be logged in to register a pet.");
      return;
    }

    try {
      // Set loading state to true while registering
      setLoading(true);

      // Add pet to the database under the logged-in user
      await addDoc(collection(db, "pets"), {
        userId: user.uid,
        petName,
        breed,
        age: parseInt(age),
      });

      // Navigate back to the Home screen after successful registration
      Alert.alert("Pet Registered", "Your pet has been successfully registered.");
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error registering pet:", error);
      Alert.alert("Error", "Something went wrong while registering the pet.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to registration screen for a new user
  const handleNavigateToRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Register Your Pet</Text>

      {/* Check if user is logged in */}
      {!auth.currentUser ? (
        // New User - Navigate to Register Page
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Please Sign Up to Register Your Pet</Text>
          <Button mode="contained" onPress={handleNavigateToRegister} style={styles.navigateButton}>
            Go to Signup
          </Button>
        </View>
      ) : (
        // Current User - Show Pet Registration Form
        <>
          <TextInput
            label="Pet Name"
            value={petName}
            onChangeText={setPetName}
            style={styles.input}
            mode="outlined"
            placeholder="Enter pet's name"
          />
          <TextInput
            label="Breed"
            value={breed}
            onChangeText={setBreed}
            style={styles.input}
            mode="outlined"
            placeholder="Enter breed"
          />
          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            placeholder="Enter pet's age"
          />
          <Divider style={styles.divider} />

          <Button
            mode="contained"
            onPress={handleRegisterPet}
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
            loading={loading}
          >
            {loading ? "Registering..." : "Register Pet"}
          </Button>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    marginTop: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  radioContainer: {
    marginVertical: 15,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 20,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#6200ee', // Purple color
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    color: '#555',
  },
  navigateButton: {
    backgroundColor: '#6200ee', // Purple color
  },
});

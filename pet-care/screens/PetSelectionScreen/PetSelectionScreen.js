
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, RadioButton, Divider } from 'react-native-paper';
import { auth, db, collection, addDoc } from '../../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

export default function PetRegistrationScreen({ navigation }) {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleRegisterPet = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not Logged In", "You must be logged in to register a pet.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "pets"), {
        userId: user.uid,
        petName,
        breed,
        age: parseInt(age),
      });
      Alert.alert("Pet Registered", "Your pet has been successfully registered.");
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error registering pet:", error);
      Alert.alert("Error", "Something went wrong while registering the pet.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <LinearGradient
      colors={['#FF6F91', '#FF9A8B', '#FDCB82']}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Register Your Pet</Text>

        {!auth.currentUser ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Please Sign Up to Register Your Pet</Text>
            <Button mode="contained" onPress={handleNavigateToRegister} style={styles.navigateButton}>
              Go to Signup
            </Button>
          </View>
        ) : (
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
              placeholder="Enter breed as Cat, Dog & others"
            />
            <TextInput
              label="Age"
              value={age}
              onChangeText={setAge}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              placeholder="Enter pet's age in years"
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
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
  divider: {
    marginVertical: 20,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#6200ee',
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
    backgroundColor: '#6200ee',
  },
});

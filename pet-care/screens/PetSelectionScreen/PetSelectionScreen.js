

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { TextInput, Button, Text } from 'react-native-paper';
// import { auth, db, collection, addDoc } from '../../firebaseConfig';

// export default function PetRegistrationScreen({ navigation }) {
//   const [petName, setPetName] = useState('');
//   const [breed, setBreed] = useState('');
//   const [age, setAge] = useState('');

//   const handleRegisterPet = async () => {
//     if (auth.currentUser) {
//       await addDoc(collection(db, "pets"), {
//         userId: auth.currentUser.uid,
//         petName,
//         breed,
//         age
//       });
//       navigation.navigate('Home'); // Navigate back to HomeScreen after successful registration
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Register Your Pet</Text>
//       <TextInput label="Pet Name" value={petName} onChangeText={setPetName} style={styles.input} />
//       <TextInput label="Breed" value={breed} onChangeText={setBreed} style={styles.input} />
//       <TextInput label="Age" value={age} onChangeText={setAge} style={styles.input} />
//       <Button mode="contained" onPress={handleRegisterPet} style={styles.button}>Register</Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   input: { width: '100%', marginBottom: 10 },
//   button: { marginTop: 10, width: '100%' }
// });


import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { auth, db, collection, addDoc } from '../../firebaseConfig';

export default function PetRegistrationScreen({ navigation }) {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [appointments, setAppointments] = useState('');
  const [medications, setMedications] = useState('');
  const [vaccinations, setVaccinations] = useState('');
  const [mealPlan, setMealPlan] = useState('');

  const handleRegisterPet = async () => {
    if (auth.currentUser) {
      await addDoc(collection(db, "pets"), {
        userId: auth.currentUser.uid,
        petName,
        breed,
        age,
        appointments: appointments.split(',').map(item => item.trim()), // Saving appointments as an array
        medications: medications.split(',').map(item => item.trim()), // Saving medications as an array
        vaccinations: vaccinations.split(',').map(item => item.trim()), // Saving vaccinations as an array
        mealPlan,
      });
      navigation.navigate('Home'); // Navigate back to HomeScreen after successful registration
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Your Pet</Text>
      <TextInput label="Pet Name" value={petName} onChangeText={setPetName} style={styles.input} />
      <TextInput label="Breed" value={breed} onChangeText={setBreed} style={styles.input} />
      <TextInput label="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
      
      {/* New fields for appointments, medications, vaccinations, and meal plan */}
      <TextInput label="Appointments (comma separated)" value={appointments} onChangeText={setAppointments} style={styles.input} />
      <TextInput label="Medications (comma separated)" value={medications} onChangeText={setMedications} style={styles.input} />
      <TextInput label="Vaccinations (comma separated)" value={vaccinations} onChangeText={setVaccinations} style={styles.input} />
      <TextInput label="Meal Plan" value={mealPlan} onChangeText={setMealPlan} style={styles.input} />

      <Button mode="contained" onPress={handleRegisterPet} style={styles.button}>Register</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', marginBottom: 10 },
  button: { marginTop: 10, width: '100%' }
});

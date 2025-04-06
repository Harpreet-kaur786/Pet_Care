

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Card, IconButton, Button, Divider } from 'react-native-paper';
import { auth, db, collection, getDocs, signOut } from '../../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const usersSnapshot = await getDocs(collection(db, "users"));
        usersSnapshot.forEach(doc => {
          if (doc.data().uid === auth.currentUser.uid) {
            setUserData(doc.data());
          }
        });
      }
    };

    const fetchPetData = async () => {
      if (auth.currentUser) {
        const petsSnapshot = await getDocs(collection(db, "pets"));
        const pets = [];
        petsSnapshot.forEach(doc => {
          if (doc.data().userId === auth.currentUser.uid) {
            pets.push(doc.data());
          }
        });
        setPetData(pets);
      }
    };
    fetchUserData();
    fetchPetData();
  
  }, []);

  // Logout Function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // On success, navigate to login screen
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const services = [
    {
      title: "Vaccination",
      imageUrl: require('../../assets/pet.jpg'), 
      screen: "Vaccination"
    },
    {
      title: "Diet & Nutrition",
      imageUrl: require('../../assets/pet2.jpg'), 
      screen: "DietNutrition"
    },
    {
      title: "Wellness & Prevention",
      imageUrl: require('../../assets/pet3.jpg'),
      screen: "WellnessPreventive"
    }
  ]
 
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Logout Icon */}
      <View style={styles.logoutIcon}>
        <IconButton icon="logout" size={28} onPress={handleLogout} color="#E53935" />
      </View>

      {/* Welcome & Profile */}
      {userData && (
        <View style={styles.headerSection}>
          <Avatar.Text label={userData.name.charAt(0).toUpperCase()} size={60} style={styles.avatar} />
          <Text style={styles.welcomeText}>Hey, {userData.name} 👋</Text>
          <Text style={styles.subText}>Here’s what’s happening with your pets today.</Text>
        </View>
      )}

      <Divider style={{ marginVertical: 20, width: '100%' }} />

      {/* Pets Section */}
      <Text style={styles.sectionTitle}>Your Pets</Text>

      {petData.length > 0 ? (
        petData.map((pet, index) => (
            <Card 
            key={index} 
            style={styles.petCard}
            onPress={() => navigation.navigate('PetProfile', { petId: pet.id })}
          >
            <Card.Content>
              <Text style={styles.petName}>{pet.petName}</Text>
              <Text style={styles.petDetails}>Breed: {pet.breed}</Text>
              <Text style={styles.petDetails}>Age: {pet.age} yrs</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={styles.noPetsText}>No pets added yet 🐾</Text>
      )}

      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('PetSelection')} 
        style={styles.addPetButton}
        buttonColor="#4CAF50"
      >
        + Add Pet
      </Button>

      <Divider style={{ marginVertical: 30, width: '100%' }} />
      <Text style={styles.sectionTitle}>Services for Your Pets</Text>
<FlatList
  data={services}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => item.screen && navigation.navigate(item.screen)}
    >
      <Text style={styles.serviceText}>{item.title}</Text>
    </TouchableOpacity>
  )}
  contentContainerStyle={styles.categoryList}
/>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  logoutIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  
  headerSection: {
    alignItems: 'center',
    marginTop: 40, // Increased margin for better spacing
    marginBottom: 20, // Added margin for space between text and divider
    paddingHorizontal: 20, // Added padding for better responsiveness
  },
  
  avatar: {
    marginBottom: 10, // Space between avatar and text
  },
  
  welcomeText: {
    fontSize: 22, // Larger font for better visibility
    fontWeight: 'bold', // Bold text for emphasis
    color: '#333', // A darker color for contrast
  },
  
  subText: {
    fontSize: 16,
    color: '#666', // Subtle color for secondary text
    textAlign: 'center', // Center the subtext for better alignment
    marginBottom: 10, // Space below the subtext
  },
  
  divider: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#E0E0E0', // Lighter color for the divider to match the theme
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#222',
  },
  petCard: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    padding: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E3E3E',
  },
  petDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  noPetsText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 15,
  },
  addPetButton: {
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
  },
  categoryList: {
    paddingHorizontal: 5,
  },
  categoryItem: {
    backgroundColor: '#E1F5FE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 12,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#0277BD',
    fontWeight: '600',
  },
  serviceCard: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 16,
    marginRight: 12,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FB8C00',
  },
  
});
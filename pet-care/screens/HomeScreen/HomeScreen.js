import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity ,Modal, TextInput} from 'react-native';
import { Text, Avatar, Card, IconButton, Button, Divider } from 'react-native-paper';
import { auth, db, collection, getDocs, signOut } from '../../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [petData, setPetData] = useState([]);
   // State for modal visibility and feedback input
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [feedback, setFeedback] = useState('');

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
            //pets.push(doc.data());
            pets.push({ id: doc.id, ...doc.data() }); 
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
  ];

  // Function to return the correct image based on pet breed
  const getPetImage = (breed) => {
    if (breed.toLowerCase() === 'cat') {
      return require('../../assets/pet4.jpg'); // Replace with actual cat image path
    } else if (breed.toLowerCase() === 'dog') {
      return require('../../assets/pet.jpg'); // Replace with actual dog image path
    }
    return require('../../assets/pet3.jpg'); // Default image for other breeds
  };
   // Open/Close Modal
   const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (feedback) {
      console.log('Feedback Submitted:', feedback);
      setFeedback(''); // Reset feedback input
      toggleModal(); // Close the modal
    } else {
      alert('Please enter some feedback before submitting!');
    }
  };

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
              {/* Conditionally Render Pet Image Based on Breed */}
              <Image 
                source={getPetImage(pet.breed)} 
                style={styles.petImage}
              />
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
             <Image 
              source={item.imageUrl} 
              style={styles.serviceImage}
            />
            <Text style={styles.serviceText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryList}
      />

       {/* Creative Message */}
       <View style={styles.feedbackMessage}>
        <Text style={styles.feedbackTitle}>We'd love to hear from you!</Text>
        <Text style={styles.feedbackText}>Your feedback helps us improve and serve you better. Tell us what you think about the app, your pets, or anything else!</Text>
      </View>
       {/* Feedback Button */}
       <Button 
        mode="contained" 
        onPress={toggleModal}
        style={styles.feedbackButton}
        buttonColor="#FF7043"
      >
        Give Feedback
      </Button>

      {/* Modal for Feedback Form */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>We value your feedback!</Text>
            <TextInput
              placeholder="Enter your feedback here..."
              value={feedback}
              onChangeText={setFeedback}
              style={styles.feedbackInput}
              multiline
              numberOfLines={4}
            />
            <Button
              mode="contained"
              onPress={handleFeedbackSubmit}
              style={styles.submitButton}
            >
              Submit Feedback
            </Button>
            <Button
              mode="text"
              onPress={toggleModal}
              style={styles.closeButton}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logoutIcon: {
    alignSelf: 'flex-end',
  },
  headerSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: '#4CAF50',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  petCard: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  petImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  petDetails: {
    fontSize: 14,
    color: '#555',
  },
  noPetsText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  addPetButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  serviceCard: {
    marginRight: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#E0F7FA',
    width: 150,
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoryList: {
    marginTop: 20,
  },
  feedbackMessage: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7043',
  },
  feedbackText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  feedbackButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 100,
  },
  submitButton: {
    marginTop: 10,
    width: '100%',
  },
  closeButton: {
    marginTop: 10,
    width: '100%',
  },
});


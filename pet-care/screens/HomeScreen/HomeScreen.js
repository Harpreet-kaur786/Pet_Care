// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity ,Modal, TextInput} from 'react-native';
// import { Text, Avatar, Card, IconButton, Button, Divider } from 'react-native-paper';
// import { auth, db, collection, getDocs, signOut } from '../../firebaseConfig';

// export default function HomeScreen({ navigation }) {
//   const [userData, setUserData] = useState(null);
//   const [petData, setPetData] = useState([]);
//    // State for modal visibility and feedback input
//    const [isModalVisible, setIsModalVisible] = useState(false);
//    const [feedback, setFeedback] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (auth.currentUser) {
//         const usersSnapshot = await getDocs(collection(db, "users"));
//         usersSnapshot.forEach(doc => {
//           if (doc.data().uid === auth.currentUser.uid) {
//             setUserData(doc.data());
//           }
//         });
//       }
//     };

//     const fetchPetData = async () => {
//       if (auth.currentUser) {
//         const petsSnapshot = await getDocs(collection(db, "pets"));
//         const pets = [];
//         petsSnapshot.forEach(doc => {
//           if (doc.data().userId === auth.currentUser.uid) {
//             //pets.push(doc.data());
//             pets.push({ id: doc.id, ...doc.data() }); 
//           }
//         });
//         setPetData(pets);
//       }
//     };
//     fetchUserData();
//     fetchPetData();
//   }, []);

//   // Logout Function
//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         // On success, navigate to login screen
//         navigation.navigate('Login');
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error);
//       });
//   };

//   const services = [
//     {
//       title: "Vaccination",
//       imageUrl: require('../../assets/pet.jpg'), 
//       screen: "Vaccination"
//     },
//     {
//       title: "Diet & Nutrition",
//       imageUrl: require('../../assets/pet2.jpg'), 
//       screen: "DietNutrition"
//     },
//     {
//       title: "Wellness & Prevention",
//       imageUrl: require('../../assets/pet3.jpg'),
//       screen: "WellnessPreventive"
//     }
//   ];

//   // Function to return the correct image based on pet breed
//   const getPetImage = (breed) => {
//     if (breed.toLowerCase() === 'cat') {
//       return require('../../assets/pet4.jpg'); // Replace with actual cat image path
//     } else if (breed.toLowerCase() === 'dog') {
//       return require('../../assets/pet.jpg'); // Replace with actual dog image path
//     }
//     return require('../../assets/pet3.jpg'); // Default image for other breeds
//   };
//    // Open/Close Modal
//    const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   // Handle feedback submission
//   const handleFeedbackSubmit = () => {
//     if (feedback) {
//       console.log('Feedback Submitted:', feedback);
//       setFeedback(''); // Reset feedback input
//       toggleModal(); // Close the modal
//     } else {
//       alert('Please enter some feedback before submitting!');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       {/* Logout Icon */}
//       <View style={styles.logoutIcon}>
//         <IconButton icon="logout" size={28} onPress={handleLogout} color="#E53935" />
//       </View>

//       {/* Welcome & Profile */}
//       {userData && (
//         <View style={styles.headerSection}>
//           <Avatar.Text label={userData.name.charAt(0).toUpperCase()} size={60} style={styles.avatar} />
//           <Text style={styles.welcomeText}>Hey, {userData.name} 👋</Text>
//           <Text style={styles.subText}>Here’s what’s happening with your pets today.</Text>
//         </View>
//       )}

//       <Divider style={{ marginVertical: 20, width: '100%' }} />

//       {/* Pets Section */}
//       <Text style={styles.sectionTitle}>Your Pets</Text>

//       {petData.length > 0 ? (
//         petData.map((pet, index) => (
//           <Card 
//             key={index} 
//             style={styles.petCard}
//             onPress={() => navigation.navigate('PetProfile', { petId: pet.id })}
//           >
//             <Card.Content>
//               {/* Conditionally Render Pet Image Based on Breed */}
//               <Image 
//                 source={getPetImage(pet.breed)} 
//                 style={styles.petImage}
//               />
//               <Text style={styles.petName}>{pet.petName}</Text>
//               <Text style={styles.petDetails}>Breed: {pet.breed}</Text>
//               <Text style={styles.petDetails}>Age: {pet.age} yrs</Text>
//             </Card.Content>
//           </Card>
//         ))
//       ) : (
//         <Text style={styles.noPetsText}>No pets added yet 🐾</Text>
//       )}

//       <Button 
//         mode="contained" 
//         onPress={() => navigation.navigate('PetSelection')} 
//         style={styles.addPetButton}
//         buttonColor="#4CAF50"
//       >
//         + Add Pet
//       </Button>

//       <Divider style={{ marginVertical: 30, width: '100%' }} />
//       <Text style={styles.sectionTitle}>Services for Your Pets</Text>

//       <FlatList
//         data={services}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={styles.serviceCard}
//             onPress={() => item.screen && navigation.navigate(item.screen)}
//           >
//              <Image 
//               source={item.imageUrl} 
//               style={styles.serviceImage}
//             />
//             <Text style={styles.serviceText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryList}
//       />

//        {/* Creative Message */}
//        <View style={styles.feedbackMessage}>
//         <Text style={styles.feedbackTitle}>We'd love to hear from you!</Text>
//         <Text style={styles.feedbackText}>Your feedback helps us improve and serve you better. Tell us what you think about the app, your pets, or anything else!</Text>
//       </View>
//        {/* Feedback Button */}
//        <Button 
//         mode="contained" 
//         onPress={toggleModal}
//         style={styles.feedbackButton}
//         buttonColor="#FF7043"
//       >
//         Give Feedback
//       </Button>

//       {/* Modal for Feedback Form */}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={toggleModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>We value your feedback!</Text>
//             <TextInput
//               placeholder="Enter your feedback here..."
//               value={feedback}
//               onChangeText={setFeedback}
//               style={styles.feedbackInput}
//               multiline
//               numberOfLines={4}
//             />
//             <Button
//               mode="contained"
//               onPress={handleFeedbackSubmit}
//               style={styles.submitButton}
//             >
//               Submit Feedback
//             </Button>
//             <Button
//               mode="text"
//               onPress={toggleModal}
//               style={styles.closeButton}
//             >
//               Close
//             </Button>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#F9FAFB',
//     paddingBottom: 100,
//   },
//   logoutIcon: {
//     alignSelf: 'flex-end',
//   },
//   headerSection: {
//     alignItems: 'center',
//     marginVertical: 20,
//     backgroundColor: '#E0F2F1',
//     padding: 20,
//     borderRadius: 15,
//   },
//   avatar: {
//     backgroundColor: '#26A69A',
//     marginBottom: 10,
//   },
//   welcomeText: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#00796B',
//   },
//   subText: {
//     fontSize: 16,
//     color: '#555',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#37474F',
//   },
//   petCard: {
//     marginBottom: 20,
//     borderRadius: 15,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   petImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   petName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#212121',
//   },
//   petDetails: {
//     fontSize: 14,
//     color: '#757575',
//     marginTop: 4,
//   },
//   noPetsText: {
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//     color: '#999',
//   },
//   addPetButton: {
//     marginTop: 20,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   serviceCard: {
//     marginRight: 20,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: 'rgba(224, 247, 250, 0.8)',
//     width: 160,
//     alignItems: 'center',
//     shadowColor: '#00796B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   serviceImage: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   serviceText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 12,
//     color: '#004D40',
//     textAlign: 'center',
//   },
//   categoryList: {
//     marginTop: 10,
//     paddingBottom: 10,
//   },
//   feedbackMessage: {
//     backgroundColor: '#FFF3E0',
//     padding: 20,
//     borderRadius: 15,
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   feedbackTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FB8C00',
//     marginBottom: 10,
//   },
//   feedbackText: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//   },
//   feedbackButton: {
//     marginTop: 20,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     padding: 25,
//     borderRadius: 15,
//     width: '85%',
//     alignItems: 'center',
//     elevation: 6,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#212121',
//   },
//   feedbackInput: {
//     width: '100%',
//     padding: 12,
//     borderColor: '#BDBDBD',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   submitButton: {
//     marginTop: 10,
//     width: '100%',
//     backgroundColor: '#FF7043',
//     borderRadius: 8,
//   },
//   closeButton: {
//     marginTop: 10,
//     width: '100%',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Text, Avatar, Card, IconButton, Button, Divider } from 'react-native-paper';
import { auth, db, collection, getDocs, signOut } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [petData, setPetData] = useState([]);
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
            pets.push({ id: doc.id, ...doc.data() });
          }
        });
        setPetData(pets);
      }
    };
    fetchUserData();
    fetchPetData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigation.navigate('Login'))
      .catch((error) => console.error("Error signing out: ", error));
  };

  const services = [
    { title: "Vaccination", imageUrl: require('../../assets/pet.jpg'), screen: "Vaccination" },
    { title: "Diet & Nutrition", imageUrl: require('../../assets/pet2.jpg'), screen: "DietNutrition" },
    { title: "Wellness & Prevention", imageUrl: require('../../assets/pet3.jpg'), screen: "WellnessPreventive" }
  ];

  const getPetImage = (breed) => {
    if (breed.toLowerCase() === 'cat') return require('../../assets/pet3.jpg');
    if (breed.toLowerCase() === 'dog') return require('../../assets/pet.jpg');
    return require('../../assets/pet3.jpg');
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleFeedbackSubmit = () => {
    if (feedback) {
      console.log('Feedback Submitted:', feedback);
      setFeedback('');
      toggleModal();
    } else {
      alert('Please enter some feedback before submitting!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
<TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Icon
          name="sign-out" // New logout icon
          size={30} 
          color="#FF5722" // Custom color for logout icon
        />
        <Text style={{ marginTop: 10, fontSize: 18 }}>Logout</Text>
      </TouchableOpacity>

      {userData && (
        <View style={styles.headerSection}>
          <Avatar.Text label={userData.name.charAt(0).toUpperCase()} size={60} style={styles.avatar} />
          <Text style={styles.welcomeText}>Hey, {userData.name} 👋</Text>
          <Text style={styles.subText}>Here’s what’s happening with your pets today.</Text>
        </View>
      )}

<Text style={styles.sectionTitle}>Your Pets</Text>

{petData.length > 0 ? (
  <View style={styles.cardRow}>
    {petData.map((pet, index) => (
      <Card key={index} style={styles.petCard} onPress={() => navigation.navigate('PetProfile', { petId: pet.id })}>
        <Card.Content>
          <Image source={getPetImage(pet.breed)} style={styles.petImage} />
          <Text style={styles.petName}>{pet.petName}</Text>
          <Text style={styles.petDetails}>Breed: {pet.breed}</Text>
          <Text style={styles.petDetails}>Age: {pet.age} yrs</Text>
        </Card.Content>
      </Card>
    ))}
  </View>
) : (
  <Text style={styles.noPetsText}>No pets added yet 🐾</Text>
)}


      <Button mode="contained" onPress={() => navigation.navigate('PetSelection')} style={styles.addPetButton}>+ Add Pet</Button>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Services for Your Pets</Text>

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceCard} onPress={() => item.screen && navigation.navigate(item.screen)}>
            <Image source={item.imageUrl} style={styles.serviceImage} />
            <Text style={styles.serviceText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryList}
      />

      <View style={styles.feedbackMessage}>
        <Text style={styles.feedbackTitle}>We'd love to hear from you!</Text>
        <Text style={styles.feedbackText}>Your feedback helps us improve and serve you better. Tell us what you think about the app, your pets, or anything else!</Text>
      </View>

      <Button mode="contained" onPress={toggleModal} style={styles.feedbackButton}>Give Feedback</Button>

      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal}>
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
            <Button mode="contained" onPress={handleFeedbackSubmit} style={styles.submitButton}>Submit Feedback</Button>
            <Button mode="text" onPress={toggleModal} style={styles.closeButton}>Close</Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF3E0',
  },
  logoutIcon: {
    alignSelf: 'flex-end',
  },
  headerSection: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#E0F2F1',
    padding: 20,
    borderRadius: 15,
  },
  avatar: {
    backgroundColor: '#26A69A',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796B',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
 sectionTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginVertical: 20,
  textAlign: 'center',
},
cardRow: {
  flexDirection: 'row',
  flexWrap: 'wrap', // Allows wrapping of cards into multiple rows
  justifyContent: 'space-between', // Ensures space between cards
},
petCard: {
  flexDirection: 'row',
  padding: 10,
  marginVertical: 10,
  backgroundColor: 'rgba(224, 247, 250, 0.8)',
  borderRadius: 10,
  elevation: 5,
  height: 220,
  width: '48%', // Two cards per row with space between them
  marginBottom: 20, // Adds space between rows
},
petImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginRight: 20,
},
petName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
petDetails: {
  fontSize: 14,
  color: '#666',
  marginTop: 5,
},
noPetsText: {
  fontSize: 18,
  color: '#999',
  textAlign: 'center',
  marginTop: 20,
},

  addPetButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
  },
  serviceCard: {
    marginRight: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(224, 247, 250, 0.8)',
    width: 160,
    alignItems: 'center',
    shadowColor: '#00796B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#004D40',
    textAlign: 'center',
  },
  categoryList: {
    marginTop: 10,
    paddingBottom: 10,
  },
  feedbackMessage: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FB8C00',
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  feedbackButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FF7043',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
  },
  feedbackInput: {
    width: '100%',
    padding: 12,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#FF7043',
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 10,
    width: '100%',
  },
  divider: {
    marginVertical: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333', // Title color
  },
  petCardsContainer: {
    flexDirection: 'row', // Arrange cards horizontally
    flexWrap: 'wrap', // Allow wrapping to create multiple rows
    justifyContent: 'space-between', // Distribute space evenly between cards
    paddingHorizontal: 10, // Add padding on the sides of the container
  },
  petCard: {
    flexDirection: 'row', // Arrange items horizontally
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(224, 247, 250, 0.8)', // Light background with opacity
    borderRadius: 10,
    elevation: 5, // Shadow effect on Android
    height: 220,
    width: '48%', // Set card width to fit 2 cards per row
    marginBottom: 10, // Space at the bottom for wrapping
  },
  cardContent: {
    flexDirection: 'row', // Horizontal layout for the card content
    alignItems: 'center', // Vertically center the content
  },
  petImage: {
    width: 100, // Image size
    height: 100, // Image size
    borderRadius: 10,
    marginRight: 15, // Space between image and text
    borderWidth: 2, // Border around image
    borderColor: '#ddd', // Border color for image
  },
  petDetailsContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center',
  },
  petName: {
    fontSize: 18, // Adjust size to fit in card
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petDetails: {
    fontSize: 14, // Adjust size to fit in card
    color: '#555',
    marginTop: 5,
  },
  noPetsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

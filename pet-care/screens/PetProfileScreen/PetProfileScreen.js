import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const PetProfileScreen = ({ navigation,route }) => {
  const petId = "cat 1";
  const [pet, setPet] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPet, setUpdatedPet] = useState({});
  const [newAppointment, setNewAppointment] = useState({ date: "", description: "" });
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "" });
  const [newVaccination, setNewVaccination] = useState({ name: "", dueDate: "" });
//   const [isAddingAppointment, setIsAddingAppointment] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isAddingMedications, setIsAddingMedications] = useState(false);
//   const [isMedicationModalVisible, setIsMedicationModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'appointment', 'medication', 'vaccination'
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    fetchPetProfile();
    fetchMealPlan();
  }, []);

  {/* Fetching the Pet Profile */}
  const fetchPetProfile = async () => {
    try {
      const petDocRef = doc(db, "categories", "cat", "catList", petId);
      const petSnapshot = await getDoc(petDocRef);

      if (petSnapshot.exists()) {
        let petData = petSnapshot.data();
        petData.appointments = Array.isArray(petData.appointments)
          ? petData.appointments
          : [];
        petData.medications = Array.isArray(petData.medications)
          ? petData.medications
          : [];
        petData.vaccinations = Array.isArray(petData.vaccinations)
          ? petData.vaccinations
          : [];
        petData.age = petData.age || 0;
        setPet(petData);
        setUpdatedPet(petData);
      } else {
        console.log("Document does not exist!");
        Alert.alert("Error", "Pet not found.");
      }
    } catch (error) {
      console.error("Firestore Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  {/* Fetching the meal plan */}
  const fetchMealPlan = async () => {
    try {
      console.log("Fetching meal plan for ID:", petId);
      const mealPlanDocRef = doc(db, "dailyMealPlan", "cat"); // For cat, change this for dog
      const mealPlanSnapshot = await getDoc(mealPlanDocRef);

      if (mealPlanSnapshot.exists()) {
        const mealData = mealPlanSnapshot.data();
        setMealPlan(mealData);
      } else {
        console.log("Meal plan does not exist!");
        Alert.alert("Error", "Meal plan not found.");
      }
    } catch (error) {
      console.error("Firestore Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const petDocRef = doc(db, "categories", "cat", "catList", petId);
      await updateDoc(petDocRef, updatedPet);
      setPet(updatedPet);
      setIsEditing(false);
      Alert.alert("Success", "Pet profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  {/* Adding the appointments */}
  const handleAddAppointment = async () => {
    try {
      const petDocRef = doc(db, "categories", "cat", "catList", petId);
      const updatedAppointments = [...pet.appointments, newAppointment];
      await updateDoc(petDocRef, { appointments: updatedAppointments });
      setPet({ ...pet, appointments: updatedAppointments });
      setUpdatedPet({ ...updatedPet, appointments: updatedAppointments });
      setNewAppointment({ date: "", description: "" });
      Alert.alert("Success", "Appointment added successfully!");
      closeModal();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  {/* Adding the medications */}
  const handleAddMedication = async () => {
    try {
      const petDocRef = doc(db, "categories", "cat", "catList", petId);
      const updatedMedications = [...pet.medications, newMedication];
      await updateDoc(petDocRef, { medications: updatedMedications });
      setPet({ ...pet, medications: updatedMedications });
      setUpdatedPet({ ...updatedPet, medications: updatedMedications });
      setNewMedication({ name: "", dosage: "" });
      Alert.alert("Success", "Medication added successfully!");
      closeModal();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  {/* Adding the vaccinations */}
  const handleAddVaccination = async () => {
    try {
      const petDocRef = doc(db, "categories", "cat", "catList", petId);
      const updatedVaccinations = [...pet.vaccinations, newVaccination];
      await updateDoc(petDocRef, { vaccinations: updatedVaccinations });
      setPet({ ...pet, vaccinations: updatedVaccinations });
      setUpdatedPet({ ...updatedPet, vaccinations: updatedVaccinations });
      setNewVaccination({ name: "", dueDate: "" });
      Alert.alert("Success", "Vaccination added successfully!");
      closeModal();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  {/* Model Opening and Closing */}
  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setNewAppointment({ date: "", description: "" });
    setNewMedication({ name: "", dosage: "" });
    setNewVaccination({ name: "", dueDate: "" });
  };

  {/* Deleting the items */}
  const deleteItem = async (type, index) => {
    try {
      const petDocRef = doc(db, "categories", "cat", "catList", petId);
      let updatedList = [];

      if (type === "appointments") {
        updatedList = pet.appointments.filter((_, i) => i !== index);
        await updateDoc(petDocRef, { appointments: updatedList });
        setPet({ ...pet, appointments: updatedList });
        setUpdatedPet({ ...updatedPet, appointments: updatedList });
      } else if (type === "medications") {
        updatedList = pet.medications.filter((_, i) => i !== index);
        await updateDoc(petDocRef, { medications: updatedList });
        setPet({ ...pet, medications: updatedList });
        setUpdatedPet({ ...updatedPet, medications: updatedList });
      } else if (type === "vaccinations") {
        updatedList = pet.vaccinations.filter((_, i) => i !== index);
        await updateDoc(petDocRef, { vaccinations: updatedList });
        setPet({ ...pet, vaccinations: updatedList });
        setUpdatedPet({ ...updatedPet, vaccinations: updatedList });
      }

      Alert.alert(
        "Success",
        `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (!pet) return <Text>Loading...</Text>;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.centeredSection}>
        <Image source={{ uri: pet.image }} style={styles.profileImage} />
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={updatedPet.name}
            onChangeText={(text) =>
              setUpdatedPet({ ...updatedPet, name: text })
            }
          />
        ) : (
          <Text style={styles.name}>{pet.name}</Text>
        )}

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={updatedPet.age.toString()}
            onChangeText={(text) => {
              const updatedAge = text ? parseInt(text) : 0;
              setUpdatedPet({ ...updatedPet, age: updatedAge });
            }}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.label}>Age: {pet.age} years</Text>
        )}
            
          {/* Navigating to Meal Plan Screen */}
          <TouchableOpacity 
            onPress={() => {
              // Navigate to Meal Plan and pass petId
              navigation.navigate("MealPlan", {
                petId: petId,
              });
            }}>
            <Text style={styles.addButton}>Create Meal Plan!!!</Text>
          </TouchableOpacity>
   
      </View>
      <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Health Details</Text>
</View>


      {/* Appointments */}
      <View style={styles.buttonRow}>
      <Text style={styles.label}>Appointments:</Text>
      {isEditing && (
        <TouchableOpacity onPress={() => openModal("appointment")}>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      )}
      </View>
      {pet.appointments.length > 0 ? (
        pet.appointments.map((appt, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.info}>
              🏥 {appt.date ? appt.date : "Unknown Date"} -{" "}
              {appt.description ? appt.description : "No Description"}
            </Text>
            {isEditing && (
              <TouchableOpacity
                onPress={() => deleteItem("appointments", index)}
              >
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.info}>No Appointments Found</Text>
      )}

      {/* Medications */}
      <View style={styles.buttonRow}>
      <Text style={styles.label}>Medications:</Text>
      {isEditing && (
        <TouchableOpacity onPress={() => openModal("medication")}>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      )}
      </View>
      {pet.medications.length > 0 ? (
        pet.medications.map((med, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.info}>
              💊 {med.name ? med.name : "Unknown Medication"} -{" "}
              {med.dosage ? med.dosage : "No Dosage Info"}
            </Text>
            {isEditing && (
              <TouchableOpacity
                onPress={() => deleteItem("medications", index)}
              >
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.info}>No Medications Found</Text>
      )}

      {/* Vaccinations */}
      <View style={styles.buttonRow}>
        <Text style={styles.label}>Vaccinations:</Text>
        {isEditing && (
          <TouchableOpacity onPress={() => openModal("vaccination")}>
            <Text style={styles.addButton}>+ Add</Text>
          </TouchableOpacity>
        )}
      </View>
      {pet.vaccinations.length > 0 ? (
        pet.vaccinations.map((vac, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.info}>
              💉 {vac.name ? vac.name : "Unknown Vaccine"} - Due on{" "}
              {vac.dueDate ? vac.dueDate : "Unknown Date"}
            </Text>
            {isEditing && (
              <TouchableOpacity
                onPress={() => deleteItem("vaccinations", index)}
              >
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.info}>No Vaccinations Found</Text>
      )}

      {isEditing ? (
        <View style={styles.centeredSection}>
        <View style={styles.btn}>
          <Button
            title="Save Changes"
            onPress={() => {
              handleUpdate();
              setIsSaveEnabled(false);
            }}
          />
        </View>
        </View>
      ) : (
        <View style={styles.centeredSection}>
        <View style={styles.btn}>
          <Button
            title="Edit Profile"
            onPress={() => {
              setIsEditing(true);
              setIsSaveEnabled(true);
            }}
          />
        </View>
        </View>
      )}
       <View style={styles.divider} /> 

      {!isSaveEnabled && (
        <>
          {/* Displaying the Meal Plan */}
          {/* <View style={styles.centeredSection}>
            <Text style={styles.sectionTitle}>Recommented Meal Plan 🍱</Text>
          </View> */}
          <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Recommented Meal Plan 🍱</Text>
</View>

          {mealPlan ? (
            <>
              <Text style={styles.label}>Breakfast:</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.info}>
                  🔹 Time: {mealPlan.Breakfast.Time},
                </Text>
                <Text style={styles.info}>
                  🔹 Portion: {mealPlan.Breakfast.Portion},
                </Text>
                <Text style={styles.info}>
                  🔹 Type: {mealPlan.Breakfast.Type}
                </Text>
                <Text style={styles.info}>
                  🔹 Food Items: {mealPlan.Breakfast.FoodItems.join(", ")}
                </Text>
              </View>

              <Text style={styles.label}>Lunch:</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.info}>🔹 Time: {mealPlan.Lunch.Time},</Text>
                <Text style={styles.info}>
                  🔹 Portion: {mealPlan.Lunch.Portion},
                </Text>
                <Text style={styles.info}>🔹 Type: {mealPlan.Lunch.Type}</Text>
                <Text style={styles.info}>
                  🔹 Food Items: {mealPlan.Lunch.FoodItems.join(", ")}
                </Text>
              </View>

              <Text style={styles.label}>Dinner:</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.info}>
                  🔹 Time: {mealPlan.Dinner.Time},
                </Text>
                <Text style={styles.info}>
                  🔹 Portion: {mealPlan.Dinner.Portion},
                </Text>
                <Text style={styles.info}>🔹 Type: {mealPlan.Dinner.Type}</Text>
                <Text style={styles.info}>
                  🔹 Food Items: {mealPlan.Dinner.FoodItems.join(", ")}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.info}>No Meal Plan Found</Text>
          )}
        </>
      )}
      
        {/* Modal */}
      <Modal
        visible={modalType !== null}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {modalType === "appointment" && (
              <>
                <Text style={styles.modalLabel}>Add Appointment</Text>
                <TextInput
                  style={styles.info}
                  placeholder="Date"
                  value={newAppointment.date}
                  onChangeText={(text) =>
                    setNewAppointment({ ...newAppointment, date: text })
                  }
                />
                <TextInput
                  style={styles.info}
                  placeholder="Description"
                  value={newAppointment.description}
                  onChangeText={(text) =>
                    setNewAppointment({ ...newAppointment, description: text })
                  }
                />
                <View style={styles.buttonRow}>
                  <Button title="Save" onPress={handleAddAppointment} />
                  <Button title="Cancel" onPress={closeModal} />
                </View>
              </>
            )}

            {modalType === "medication" && (
              <>
                <Text style={styles.modalLabel}>Add Medication</Text>
                <TextInput
                  style={styles.info}
                  placeholder="Medication Name"
                  value={newMedication.name}
                  onChangeText={(text) =>
                    setNewMedication({ ...newMedication, name: text })
                  }
                />
                <TextInput
                  style={styles.info}
                  placeholder="Dosage"
                  value={newMedication.dosage}
                  onChangeText={(text) =>
                    setNewMedication({ ...newMedication, dosage: text })
                  }
                />
                <View style={styles.buttonRow}>
                  <Button title="Save" onPress={handleAddMedication} />
                  <Button title="Cancel" onPress={closeModal} />
                </View>
              </>
            )}

            {modalType === "vaccination" && (
              <>
                <Text style={styles.modalLabel}>Add Vaccination</Text>
                <TextInput
                  style={styles.info}
                  placeholder="Vaccine Name"
                  value={newVaccination.name}
                  onChangeText={(text) =>
                    setNewVaccination({ ...newVaccination, name: text })
                  }
                />
                <TextInput
                  style={styles.info}
                  placeholder="Due Date"
                  value={newVaccination.dueDate}
                  onChangeText={(text) =>
                    setNewVaccination({ ...newVaccination, dueDate: text })
                  }
                />
                <View style={styles.buttonRow}>
                  <Button title="Save" onPress={handleAddVaccination} />
                  <Button title="Cancel" onPress={closeModal} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PetProfileScreen;

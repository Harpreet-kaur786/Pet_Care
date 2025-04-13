import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
const MealPlanScreen = ({ route }) => {
  const { petId, mealPlanId } = route.params || {}; // mealPlanId to identify the existing meal plan
  const [mealPlan, setMealPlan] = useState({
    time: 'Morning',
    foodType: ['Wet Food'],
    portionSize: 'Small',
    specialNotes: '',
  });
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // Track whether it's edit mode

  const navigation = useNavigation();

  const MEAL_TIMES = ['Morning', 'Afternoon', 'Evening'];
  const FOOD_TYPES = ['Wet Food', 'Dry Food', 'Raw Diet', 'Treats'];
  const PORTION_SIZES = ['Small', 'Medium', 'Large'];
  useEffect(() => {
    navigation.setOptions({
      title: 'Meal Plan ',
      headerStyle: {
        backgroundColor: '#FF5722',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Icon
            name="bars"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginRight: 15 }}>
        <Icon
          name="sign-out"
          size={26}
          color="#fff"
        />
      </TouchableOpacity>
      
      )
    });
  }, [navigation]);

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!petId) return;

      try {
        const petRef = doc(db, 'pets', petId);
        const petSnapshot = await getDoc(petRef);

        if (petSnapshot.exists()) {
          setPet({ id: petSnapshot.id, ...petSnapshot.data() });
        } else {
          console.warn('Pet not found in Firestore!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pet details:', error);
        setLoading(false);
      }
    };

    const fetchMealPlanDetails = async () => {
      if (!mealPlanId) return;

      try {
        const mealPlanRef = doc(db, 'dailyMealPlan', mealPlanId);
        const mealPlanSnapshot = await getDoc(mealPlanRef);

        if (mealPlanSnapshot.exists()) {
          setMealPlan(mealPlanSnapshot.data());
          setIsEditMode(true); // Switch to edit mode
        } else {
          console.warn('Meal plan not found in Firestore!');
        }
      } catch (error) {
        console.error('Error fetching meal plan details:', error);
      }
    };

    fetchPetDetails();
    fetchMealPlanDetails();
  }, [petId, mealPlanId]);

  const handleSaveMealPlan = async () => {
    if (!mealPlan.foodType.length || !mealPlan.portionSize) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const dailyMealPlanRef = collection(db, 'dailyMealPlan');
      await addDoc(dailyMealPlanRef, {
        petId,
        time: mealPlan.time,
        foodType: mealPlan.foodType,
        portionSize: mealPlan.portionSize,
        specialNotes: mealPlan.specialNotes,
        date: new Date().toISOString(),
      });

      Alert.alert('Success', 'Meal plan saved successfully');
      navigation.navigate('DailyMealPlan', { petId });
    } catch (error) {
      console.error('Error saving meal plan:', error);
      Alert.alert('Error', 'Failed to save meal plan');
    }
  };

  const handleUpdateMealPlan = async () => {
    if (!mealPlan.foodType.length || !mealPlan.portionSize) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const mealPlanRef = doc(db, 'dailyMealPlan', mealPlanId);
      await updateDoc(mealPlanRef, {
        time: mealPlan.time,
        foodType: mealPlan.foodType,
        portionSize: mealPlan.portionSize,
        specialNotes: mealPlan.specialNotes,
      });

      Alert.alert('Success', 'Meal plan updated successfully');
      navigation.navigate('DailyMealPlan', { petId });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      Alert.alert('Error', 'Failed to update meal plan');
    }
  };

  const toggleFoodType = (item) => {
    setMealPlan((prevMealPlan) => {
      const foodType = prevMealPlan.foodType.includes(item)
        ? prevMealPlan.foodType.filter((food) => food !== item)
        : [...prevMealPlan.foodType, item];
      return { ...prevMealPlan, foodType };
    });
  };

  const handleYouTubeLink = () => {
    Linking.openURL('https://www.youtube.com/results?search_query=pet+recipe');
  };

  const handleDietaryLink = () => {
    Linking.openURL('https://boneandbiscuit.ca/pet-nutrition-for-dogs-cats/');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
 
  return (
    <LinearGradient
    colors={['#FF6F91', '#FF9A8B', '#FDCB82']}
    style={styles.gradientContainer}
  >
    <View style={styles.scrollContent}>
      <Text style={styles.header}>
        {pet?.petName ? `${pet.petName}'s Meal Plan` : 'Meal Plan'}
      </Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.mealPlanContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Meal Time</Text>
            <View style={styles.checklist}>
              {MEAL_TIMES.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.checkItem, mealPlan.time === time ? styles.selectedItem : null]}
                  onPress={() => setMealPlan({ ...mealPlan, time })}
                >
                  <Text style={styles.checkItemText}>{time}</Text>
                  <MaterialIcons name="access-time" size={20} color="#4CAF50" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Food Type (*Multiple Selection)</Text>
            <View style={styles.checklist}>
              {FOOD_TYPES.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.checkItem, mealPlan.foodType.includes(item) ? styles.selectedItem : null]}
                  onPress={() => toggleFoodType(item)}
                >
                  <Text style={styles.checkItemText}>{item}</Text>
                  <MaterialIcons name="fastfood" size={20} color="#4CAF50" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Portion Size</Text>
            <View style={styles.checklist}>
              {PORTION_SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.checkItem, mealPlan.portionSize === size ? styles.selectedItem : null]}
                  onPress={() => setMealPlan({ ...mealPlan, portionSize: size })}
                >
                  <Text style={styles.checkItemText}>{size}</Text>
                  <MaterialIcons name="restaurant" size={20} color="#4CAF50" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Special Notes</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter any special notes..."
              value={mealPlan.specialNotes}
              onChangeText={(text) => setMealPlan({ ...mealPlan, specialNotes: text })}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Nutritional Info:</Text>
            <Text style={styles.infoDescription}>
              A balanced diet helps with digestion, energy levels, and overall well-being.
            </Text>
            <Text style={styles.infoDescription}>
              - Wet food: High moisture content for hydration.
            </Text>
            <Text style={styles.infoDescription}>
              - Dry food: Good for dental health and easy storage.
            </Text>
            <Text style={styles.infoDescription}>
              - Raw food: Provides more natural nutrition but requires careful handling.
            </Text>
            <Text style={styles.infoDescription}>
              Consult with a veterinarian for personalized dietary recommendations based on your pet's breed, age, and health conditions.
            </Text>
            <Text style={styles.infoDescription}>
              Check below link for Dietary Suggestions:
            </Text>
            <TouchableOpacity onPress={handleDietaryLink}>
              <Text style={styles.linkText1}>Pet Dietary Recommendations</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.linkButton} onPress={handleYouTubeLink}>
            <MaterialIcons name="search" size={24} color="#fff" />
            <Text style={styles.linkText}>Pet Recipe Suggestions (YouTube)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={isEditMode ? handleUpdateMealPlan : handleSaveMealPlan}
          >
            <Text style={styles.saveButtonText}>
              {isEditMode ? '✏️ Update Meal Plan' : '💾 Save Meal Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22, // Reduced the font size of the heading
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Arial',
  },
  scrollView: {
    marginBottom: 20,
  },
  mealPlanContainer: { // Border container for the meal plan section
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderBottomColor: '#E53935',
    paddingBottom: 6,
  },
  textArea: {
    borderWidth: 1,
    height: 80,
    color: '#FFFFF',
    borderColor: '#E53935',
    padding: 10,
    borderRadius: 8,
    fontSize: 20,
    textAlignVertical: 'top', // Makes the text start from the top of the input
  },
  checklist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#E53935',
    color: 'FFFFFF'
  },
  checkItemText: {
    color: '#333',
    marginRight: 5,
    fontWeight: 'bold'
  },
  saveButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e76f51',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  linkText1: {
    fontSize: 18,
    color: '#4CAF50',  // You can customize the link color here
    textDecorationLine: 'underline', // Makes it look like a link
    textAlign: 'center', // Centers the link text
  },
  infoContainer: {
    backgroundColor: '#f4f4f9',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  gradientContainer: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
  },
});

export default MealPlanScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';  // Importing Ionicons for the Home icon
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
const DailyMealPlanScreen = ({ route, navigation }) => {
  const { petId, petName } = route.params || {}; // Extract petId and petName safely
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure fetchMealPlans is only called when petId is valid.
    if (!petId) return;

    const fetchMealPlans = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const mealPlansRef = collection(db, 'dailyMealPlan');
        const q = query(mealPlansRef, where('petId', '==', petId));
        const querySnapshot = await getDocs(q);

        const mealPlansData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMealPlans(mealPlansData); // Set meal plans in state
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMealPlans();
  }, [petId]); // Dependency on petId ensures this is called when petId changes

  // Function to delete a meal plan
  const deleteMealPlan = async (mealPlanId) => {
    try {
      const mealPlanRef = doc(db, 'dailyMealPlan', mealPlanId);
      await deleteDoc(mealPlanRef);
      setMealPlans((prevMealPlans) => prevMealPlans.filter((plan) => plan.id !== mealPlanId)); // Remove deleted meal plan from state
      console.log('Meal plan deleted successfully');
    } catch (error) {
      console.error('Error deleting meal plan:', error);
    }
  };

  // Function to navigate to the edit screen with the selected meal plan
  const editMealPlan = (mealPlan) => {
    navigation.navigate('MealPlan', { 
      petId, 
      mealPlanId: mealPlan.id,  // Pass the mealPlanId for editing
      mealPlan,                 // Pass the mealPlan data to be edited
      isEditing: true           // Flag indicating that we are editing
    });
  };

  // Adding the Home icon to the header on the right side
  useEffect(() => {
    navigation.setOptions({
      title: 'Daily Meal Plan',
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

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#45a29e"
        style={styles.loadingIndicator}
      />
    );
  }

  return (
    <LinearGradient
    colors={['#FF6F91', '#FF9A8B', '#FDCB82']}
    style={styles.gradientContainer} >
    <SafeAreaView style={styles.scrollContent}>
      <FlatList
        contentContainerStyle={styles.container}
        data={mealPlans}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Meal Plans for {petName || 'Your Pet'}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealTime}>Time: {item.time}</Text>
            <Text style={styles.mealDetails}>Food Type: {item.foodType.join(', ')}</Text>
            <Text style={styles.mealDetails}>Portion Size: {item.portionSize}</Text>
            <Text style={styles.specialNotes}>Special Notes: {item.specialNotes || 'No notes available'}</Text>
            {/* Buttons in one row */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editMealPlan(item)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMealPlan(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.createMealButton}
            onPress={() => navigation.navigate('MealPlan', { petId})}
          >
            <Text style={styles.createMealButtonText}>Create New Meal Plan</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  loadingIndicator: {
    marginTop: '50%',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mealItem: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  mealTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  mealDetails: {
    fontSize: 16,
    color: '#5a5a5a',
    marginTop: 5,
  },
  specialNotes: {
    fontSize: 16,
    color: '#e63946', // Red color for special notes
    marginTop: 5,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  editButton: {
    paddingVertical: 10,
    backgroundColor: '#f1c40f',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingVertical: 10,
    backgroundColor: '#e63946',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  createMealButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  createMealButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  gradientContainer: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
  },
});

export default DailyMealPlanScreen;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Import your screens
import PetProfileScreen from './screens/PetProfileScreen/PetProfileScreen';
import MealPlanScreen from './screens/MealPlanScreen';
import DailyMealPlanScreen from './screens/DailyMealPlanScreen';
import GetStartedScreen from './screens/GetStartedScreen/GetStartedScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import PetSelectionScreen from './screens/PetSelectionScreen/PetSelectionScreen';
import VaccinationScreen from './screens/VaccinationScreen/VaccinationScreen';
import DietNutritionScreen from './screens/DietNutritionScreen/DietNutritionScreen';
import WellnessPreventiveScreen from './screens/WellnessPreventionScreen/WellnessPreventionScreen';
WellnessPreventiveScreen

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// Create Bottom Tabs Navigator
// function BottomTabs() {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarActiveTintColor: 'tomato',
//                 tabBarInactiveTintColor: 'gray',
//             }}>
//             <Tab.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <Ionicons name="home" color={color} size={size} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="MealPlan"
//                 component={MealPlanScreen}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <Ionicons name="fast-food" color={color} size={size} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="Profile"
//                 component={PetProfileScreen}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <Ionicons name="person" color={color} size={size} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="DailyMealPlan"
//                 component={DailyMealPlanScreen}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <Ionicons name="calendar" color={color} size={size} />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// }
function DrawerNavigator() {
    return (
        <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: '#FF5722',
          drawerLabelStyle: { fontSize: 18 },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Vaccination" component={VaccinationScreen} />
        <Drawer.Screen name="DietNutrition" component={DietNutritionScreen} />
        <Drawer.Screen name="WellnessPreventive" component={WellnessPreventiveScreen} />
        <Drawer.Screen name="PetSelection" component={PetSelectionScreen} />
        
        {/* Logout at the very end */}
        <Drawer.Screen
          name="Logout"
          component={LoginScreen}
          options={{
            drawerLabel: 'Logout',
            drawerLabel: 'Logout',
            drawerLabelStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FF5722',
              alignSelf: 'baseline'
            },
            drawerIcon: ({ color, size }) => (
              <Icon name="sign-out" color={color} size={size} />
            )
          }}
        />
      </Drawer.Navigator>
      
    );
  }
  

// Stack Navigator to manage the login/signup flow
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="GetStarted" // 👈 Set this as the initial route
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="GetStarted" component={GetStartedScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                
                {/* After login, show bottom tab navigation */}
                <Stack.Screen name="Home" component={DrawerNavigator} />

                
                {/* Other screens */}
                <Stack.Screen name="PetSelection" component={PetSelectionScreen} />
                <Stack.Screen
  name="PetProfile"
  component={PetProfileScreen}
  options={{
    headerShown: true,
    title: 'Pet Profile',
    headerStyle: { backgroundColor: '#FF5722' },
    headerTintColor: '#fff',
  }}
/>

<Stack.Screen
  name="MealPlan"
  component={MealPlanScreen}
  options={{
    headerShown: true,
    title: 'Meal Plan',
    headerStyle: { backgroundColor: '#FF5722' },
    headerTintColor: '#fff',
  }}
/>

<Stack.Screen
  name="DailyMealPlan"
  component={DailyMealPlanScreen}
  options={{
    headerShown: true,
    title: 'Daily Meal Plan',
    headerStyle: { backgroundColor: '#FF5722' },
    headerTintColor: '#fff',
  }}
/>

                <Stack.Screen name="Vaccination" component={VaccinationScreen} />
                <Stack.Screen name="DietNutrition" component={DietNutritionScreen} />
                <Stack.Screen name="WellnessPreventive" component={WellnessPreventiveScreen} />
                {/* <Stack.Screen name="MealPlan" component={MealPlanScreen} />
                <Stack.Screen name="DailyMealPlan" component={DailyMealPlanScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

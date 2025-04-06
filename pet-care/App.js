// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import PetProfileScreen from './screens/PetProfileScreen/PetProfileScreen';
// import MealPlanScreen from './screens/MealPlanScreen';
// import DailyMealPlanScreen from './screens/DailyMealPlanScreen';
// import GetStartedScreen from './screens/GetStartedScreen/GetStartedScreen';
// const Stack = createStackNavigator();

// export default function App() {
//     return (
//         <NavigationContainer screenOptions={{ headerShown: false }}>
//             <Stack.Navigator >
//                 <Stack.Screen name="PetProfile" component={PetProfileScreen} initialParams={{ petId: 'L441RCz5Z55RXFJpT3gv' }} />
//                 <Stack.Screen name="MealPlan" component={MealPlanScreen} initialParams={{ petId: 'Cat 1' }}/>
//                 <Stack.Screen name="DailyMealPlan" component={DailyMealPlanScreen} initialParams={{ petId: 'Cat 1' }}/>
//                 <Stack.Screen name="GetStarted" component={GetStartedScreen} />

//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
const Stack = createStackNavigator();

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
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PetSelection" component={PetSelectionScreen} />
                <Stack.Screen name="PetProfile" component={PetProfileScreen} />
                <Stack.Screen name="Vaccination" component={VaccinationScreen} />
                <Stack.Screen name="DietNutrition" component={DietNutritionScreen} />
                <Stack.Screen name="WellnessPreventive" component={WellnessPreventiveScreen} />
                <Stack.Screen name="MealPlan" component={MealPlanScreen} initialParams={{ petId: 'Cat 1' }} />
                <Stack.Screen name="DailyMealPlan" component={DailyMealPlanScreen} initialParams={{ petId: 'Cat 1' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

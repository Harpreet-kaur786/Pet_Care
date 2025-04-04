import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PetProfileScreen from './screens/PetProfileScreen/PetProfileScreen';
import MealPlanScreen from './screens/MealPlanScreen/MealPlanScreen';
import DailyMealPlanScreen from './screens/MealPlanScreen/DailyMealPlan';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PetProfile">
                <Stack.Screen name="PetProfile" component={PetProfileScreen} initialParams={{ petId: 'L441RCz5Z55RXFJpT3gv' }} />
                <Stack.Screen name="MealPlan" component={MealPlanScreen} initialParams={{ petId: 'Cat 1' }}/>
                <Stack.Screen name="DailyMealPlan" component={DailyMealPlanScreen} initialParams={{ petId: 'Cat 1' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

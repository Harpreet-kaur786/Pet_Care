import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PetProfileScreen from './screens/PetProfileScreen/PetProfileScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PetProfile">
                <Stack.Screen name="PetProfile" component={PetProfileScreen} initialParams={{ petId: 'Cat 1' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

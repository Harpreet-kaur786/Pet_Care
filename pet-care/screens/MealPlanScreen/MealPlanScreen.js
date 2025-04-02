import React from "react";
import { View, Text } from "react-native";

const MealPlanScreen = ({ route }) => {
  const petId = route?.params?.petId || "No Pet Selected";

  return (
    <View>
      <Text>Meal Plan for: {petId}</Text>
    </View>
  );
};

export default MealPlanScreen;

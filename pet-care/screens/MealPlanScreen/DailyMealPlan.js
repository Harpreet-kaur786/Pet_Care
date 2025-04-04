import React from "react";
import { View, Text } from "react-native";

const DailyMealPlanScreen = ({ route }) => {
  const petId = route?.params?.petId || "No Pet Selected";

  return (
    <View>
      <Text>Daily Meal Plan for: {petId}</Text>
    </View>
  );
};

export default DailyMealPlanScreen;

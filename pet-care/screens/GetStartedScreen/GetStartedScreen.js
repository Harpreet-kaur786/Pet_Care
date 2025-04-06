import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import dog1 from "../../assets/pet3.jpg";
import dog2 from "../../assets/pet.jpg";
import dog3 from "../../assets/pet5.jpg";
import dog4 from "../../assets/pet4.jpg";
import mainDog from "../../assets/DogStarted.jpg";

const GetStartedScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#FDEEDC", "#F1C27B"]} style={[styles.container, { paddingTop: insets.top }]}> 
      {/* Upper Section with Images */}
      <View style={styles.imageWrapper}>
        <View style={styles.orangeBlock} />
        <View style={styles.orangeBlockRight} />
        <Image source={mainDog} style={styles.largeImage} />

        {/* Small Images with Shadow */}
        <View style={[styles.smallImageWrapper, { top: "10%", left: "10%" }]}> 
          <Image source={dog1} style={styles.smallImage} />
        </View>
        <View style={[styles.smallImageWrapper, { top: "20%", left: "70%" }]}> 
          <Image source={dog2} style={styles.smallImage} />
        </View>
        <View style={[styles.smallImageWrapper, { top: "50%", left: "10%" }]}> 
          <Image source={dog3} style={styles.smallImage} />
        </View>
        <View style={[styles.smallImageWrapper, { top: "65%", left: "65%" }]}> 
          <Image source={dog4} style={styles.smallImage} />
        </View>
      </View>

      {/* Lower Section */}
      <View style={styles.lowerContainer}>
        <Text style={styles.title}>Stay Ahead of Your <Text style={styles.highlight}>Pet’s</Text> with Ease!</Text>
        <Text style={styles.subtitle}>Effortlessly track your pet’s health, mood & activity for better care.</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default GetStartedScreen;

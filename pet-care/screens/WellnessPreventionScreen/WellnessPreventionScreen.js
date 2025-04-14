
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WellnessPreventiveScreen = ({ navigation }) => {
  const [isOverviewVisible, setOverviewVisible] = useState(false);
  const [isWhyVisible, setWhyVisible] = useState(false);
  const [isWhenVisible, setWhenVisible] = useState(false);
  const [isHowVisible, setHowVisible] = useState(false);

  return (
    <LinearGradient
    colors={['#FF6F91', '#FF9A8B', '#FDCB82']}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Title Section */}
        <Text style={styles.title}>Wellness & Preventive Care</Text>
        <Text style={styles.head}>
          Annual wellness exams evaluate your pet's overall health, detect problems before they become serious, and keep them on track to live a long, healthy life.
        </Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/pet5.jpg')} // Use your actual image path
            style={styles.bannerImage}
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Overview */}
          <TouchableOpacity onPress={() => setOverviewVisible(!isOverviewVisible)}>
            <Text style={styles.sectionTitle}>Overview</Text>
          </TouchableOpacity>
          {isOverviewVisible && (
            <Text style={styles.sectionText}>
              We follow your pet through the many phases of their lives. From specialized and preventative care during their younger years to regular wellness checks as they age, we seek to prevent and detect problems before they arise...
            </Text>
          )}

          {/* Why Section */}
          <TouchableOpacity onPress={() => setWhyVisible(!isWhyVisible)}>
            <Text style={styles.sectionTitle}>Why are wellness exams important?</Text>
          </TouchableOpacity>
          {isWhyVisible && (
            <Text style={styles.sectionText}>
              Wellness exams give us a chance to evaluate the overall health of your pet while also giving us a baseline for their own unique bodies and tendencies...
            </Text>
          )}

          {/* When Section */}
          <TouchableOpacity onPress={() => setWhenVisible(!isWhenVisible)}>
            <Text style={styles.sectionTitle}>When should my pet visit the vet?</Text>
          </TouchableOpacity>
          {isWhenVisible && (
            <Text style={styles.sectionText}>
              We believe in preventative medicine as the best approach to keeping our patients healthy. This includes annual wellness examinations...
            </Text>
          )}

          {/* How Section */}
          <TouchableOpacity onPress={() => setHowVisible(!isHowVisible)}>
            <Text style={styles.sectionTitle}>How do wellness exams work?</Text>
          </TouchableOpacity>
          {isHowVisible && (
            <View>
              <Text style={styles.sectionText}>
                During a wellness exam, our veterinary team will start out by taking your pet's vital signs. Our veterinarian will perform a comprehensive examination...
              </Text>
              <Text style={styles.sectionText}>
                Early detection and correction of medical problems will help to ensure that your pet will live a long, healthy, and active life.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  scrollViewContainer: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 50,
    fontFamily: "Helvetica",
  },
  head: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default WellnessPreventiveScreen;

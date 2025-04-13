import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const VaccinationScreen = ({ navigation }) => {
  const [isOverviewVisible, setOverviewVisible] = useState(false);
  const [isWhyVisible, setWhyVisible] = useState(false);
  const [isWhenVisible, setWhenVisible] = useState(false);
  const [isHowVisible, setHowVisible] = useState(false);

  return (
    <LinearGradient
    colors={ ['#FF6F91', '#FF9A8B', '#FDCB82']} // Light peach and pink shades

    style={styles.gradientContainer}
  >
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Title Section */}
        <Text style={styles.title}>Dental Care for Pets</Text>
        <Text style={styles.head}>Proper diet and nutrition can help your pet fight against disease, maintain a proper weight, and promote the overall well-being of your pet.</Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/pet.jpg')} 
            style={styles.bannerImage}
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Overview Section */}
          <TouchableOpacity onPress={() => setOverviewVisible(!isOverviewVisible)}>
            <Text style={styles.sectionTitle}>Overview</Text>
          </TouchableOpacity>
          {isOverviewVisible && (
            <Text style={styles.sectionText}>
              Studies show that 50% of all dogs and cats have some form of periodontal disease. That number jumps to 80% in pets that are 3 years of age or older. If left untreated, periodontal disease can cause infection, pain, and tooth loss over time. It can also lead to serious health problems like microscopic changes in the heart, liver, and kidneys. We recommend an annual veterinary dental healthcare examination for all pets.
            </Text>
          )}

          {/* Why Pets Need Dental Care Section */}
          <TouchableOpacity onPress={() => setWhyVisible(!isWhyVisible)}>
            <Text style={styles.sectionTitle}>Why Do Pets Need Dental Care?</Text>
          </TouchableOpacity>
          {isWhyVisible && (
            <Text style={styles.sectionText}>
              Many health problems start in the mouth. Plaque, tartar, periodontal disease, and infected teeth serve as a source of inflammation and infection for the rest of the body. Dental disease is one of the most common problems that we see in dogs and cats. It can cause drooling, reluctance to eat, swelling, bad breath, redness of the gums, loose teeth, and tooth discoloration.
            </Text>
          )}

          {/* When to Seek Dental Care Section */}
          <TouchableOpacity onPress={() => setWhenVisible(!isWhenVisible)}>
            <Text style={styles.sectionTitle}>When Should I Seek Dental Care for My Pet?</Text>
          </TouchableOpacity>
          {isWhenVisible && (
            <Text style={styles.sectionText}>
              Dental issues and related diseases can easily be prevented by visiting our veterinarians regularly for dental examinations and cleanings. We take a comprehensive approach to dental care, including dental health assessment, treatment, and prevention.
            </Text>
          )}

          {/* How It Works Section */}
          <TouchableOpacity onPress={() => setHowVisible(!isHowVisible)}>
            <Text style={styles.sectionTitle}>How Does It Work?</Text>
          </TouchableOpacity>
          {isHowVisible && (
            <View>
              <Text style={styles.subSectionTitle}>Teeth Exams, Cleaning and Polishing</Text>
              <Text style={styles.sectionText}>
                Dog and cat dental cleanings are similar to human dental cleanings, except that anesthesia is required to properly and safely examine and clean the teeth. After the cleaning, a thorough oral exam is performed, and full mouth radiographs (x-rays) are taken to evaluate the roots and any underlying disease or abnormalities.
              </Text>

              <Text style={styles.subSectionTitle}>Tooth Extractions</Text>
              <Text style={styles.sectionText}>
                We make every effort to save teeth that have a chance of being successfully treated. However, in many cases of advanced periodontal disease, treatment without extraction is unsuccessful. We only extract teeth that are beyond saving.
              </Text>

              <Text style={styles.subSectionTitle}>Minor Oral Surgery</Text>
              <Text style={styles.sectionText}>
                Many teeth require oral surgery to safely remove each individual root. Our team is trained to perform these procedures properly. Pain medications are provided in the clinic and for home aftercare.
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
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20 },
  scrollViewContainer: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginTop: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 40, 
  },
  head: {
    fontSize: 16,
    fontWeight: '500',
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 10,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    position: 'absolute',
    top: 5, 
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  gradientContainer: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
  },
});

export default VaccinationScreen;

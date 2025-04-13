
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DietNutritionScreen = ({ navigation }) => {
  const [isOverviewVisible, setOverviewVisible] = useState(false);
  const [isWhyVisible, setWhyVisible] = useState(false);
  const [isWhenVisible, setWhenVisible] = useState(false);
  const [isHowVisible, setHowVisible] = useState(false);

  return (
    <LinearGradient
    colors={ ['#FF6F91', '#FF9A8B', '#FDCB82']} // Light peach and pink shades

    style={styles.gradientContainer}
  >
    <SafeAreaView style={styles.scrollContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Title Section */}
        <Text style={styles.title}>Diet & Nutrition</Text>
        <Text style={styles.head}>
          Proper diet and nutrition can help your pet fight against disease, maintain a proper weight, and promote the overall well-being of your pet.
        </Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/pet4.jpg')} // Use your actual image path
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
              Maintaining a healthy body weight is a very important aspect of a pet’s overall physical health. Good nutrition can help provide your pet with a happier, safer, and longer life. There are many nutritional supplements that can help fight against disease, maintain a proper weight, and promote the overall well-being of any animal.
            </Text>
          )}

          {/* Why Section */}
          <TouchableOpacity onPress={() => setWhyVisible(!isWhyVisible)}>
            <Text style={styles.sectionTitle}>Why is maintaining a healthy weight important?</Text>
          </TouchableOpacity>
          {isWhyVisible && (
            <Text style={styles.sectionText}>
              Obesity is a common problem among pets, as it can be easy to over-feed a pet that knows how to beg. Being overweight is a serious problem for animals, and can cause health problems as they get older. With proper diet and exercise, all pets should be able to meet their dietary needs and be within a healthy weight range. The best way to make sure your pet’s needs are being met is to consult with us about a specific diet for your pet and their lifestyle.
            </Text>
          )}

          {/* When Section */}
          <TouchableOpacity onPress={() => setWhenVisible(!isWhenVisible)}>
            <Text style={styles.sectionTitle}>When is a diet change needed?</Text>
          </TouchableOpacity>
          {isWhenVisible && (
            <Text style={styles.sectionText}>
              Pets should be fed a balanced wellness diet based on a number of factors, including their life stage, their breed or size, and any health issues they have. Diet changes are recommended when they enter a new life stage—for example, from puppy to adult, or into their senior years. Changes may also be needed if your pet develops conditions like obesity or allergies.
            </Text>
          )}

          {/* How Section */}
          <TouchableOpacity onPress={() => setHowVisible(!isHowVisible)}>
            <Text style={styles.sectionTitle}>How diet & nutrition can help your pet</Text>
          </TouchableOpacity>
          {isHowVisible && (
            <View>
              <Text style={styles.sectionText}>
                We will help you make the right dietary changes for your pet so they can live happy and healthy lives. A healthy diet and good nutrition can reduce or even eliminate the following problems:
              </Text>

              <Text style={styles.subSectionTitle}>• Pet allergies</Text>
              <Text style={styles.subSectionTitle}>• Itching and scratching</Text>
              <Text style={styles.subSectionTitle}>• Dull coat</Text>
              <Text style={styles.subSectionTitle}>• Arthritis</Text>
              <Text style={styles.subSectionTitle}>• Joint and hip problems</Text>
              <Text style={styles.subSectionTitle}>• Bad breath</Text>
              <Text style={styles.subSectionTitle}>• Intestinal disorders</Text>

              <Text style={styles.sectionText}>
                Skin and coat supplements are great to keep your pet looking and feeling their best. Arthritis and joint supplements can also be helpful as pets age.
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
    resizeMode: 'contain'
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
    elevation: 2, // Adds shadow for better visual appeal
    marginTop: 20, // Adds space between image and content
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 40, // Added more space between back button and title
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
    top: 10, 
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

export default DietNutritionScreen;

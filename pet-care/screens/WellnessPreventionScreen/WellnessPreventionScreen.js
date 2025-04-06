// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

// const WellnessPreventiveScreen = ({ navigation }) => {
//   const [isOverviewVisible, setOverviewVisible] = useState(false);
//   const [isWhyVisible, setWhyVisible] = useState(false);
//   const [isWhenVisible, setWhenVisible] = useState(false);
//   const [isHowVisible, setHowVisible] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//         {/* Back Button */}
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Text style={styles.backButtonText}>Back</Text>
//         </TouchableOpacity>

//         {/* Title Section */}
//         <Text style={styles.title}>Wellness & Preventive Care</Text>
//         <Text style={styles.head}>
//           Annual wellness exams evaluate your pet's overall health, detect problems before they become serious, and keep them on track to live a long, healthy life.
//         </Text>

//         {/* Image Section */}
//         <View style={styles.imageContainer}>
//           <Image
//             source={require('../../assets/pet5.jpg')} // Use your actual image path
//             style={styles.bannerImage}
//           />
//         </View>

//         {/* Content Section */}
//         <View style={styles.contentContainer}>
//           {/* Overview */}
//           <TouchableOpacity onPress={() => setOverviewVisible(!isOverviewVisible)}>
//             <Text style={styles.sectionTitle}>Overview</Text>
//           </TouchableOpacity>
//           {isOverviewVisible && (
//             <Text style={styles.sectionText}>
//               We follow your pet through the many phases of their lives. From specialized and preventative care during their younger years to regular wellness checks as they age, we seek to prevent and detect problems before they arise. We know your pet is important to you, that's why we work hard to ensure they are given only the best in care through all the years of their lives.
//               The American Animal Hospital Association recommends that your pet have a wellness exam at least once every year. As your pet ages, they recommend having even more. We believe strongly in preventive care and have developed wellness protocols for every stage of the life of your pet. Depending on your pet’s life stage, vaccines may be administered, as well as disease screenings.
//             </Text>
//           )}

//           {/* Why Section */}
//           <TouchableOpacity onPress={() => setWhyVisible(!isWhyVisible)}>
//             <Text style={styles.sectionTitle}>Why are wellness exams important?</Text>
//           </TouchableOpacity>
//           {isWhyVisible && (
//             <Text style={styles.sectionText}>
//               Wellness exams give us a chance to evaluate the overall health of your pet while also giving us a baseline for their own unique bodies and tendencies. They also allow us to detect potential problems before they become serious, and even make your pet more familiar with our veterinary hospital, making future visits easier on them and you.
//             </Text>
//           )}

//           {/* When Section */}
//           <TouchableOpacity onPress={() => setWhenVisible(!isWhenVisible)}>
//             <Text style={styles.sectionTitle}>When should my pet visit the vet?</Text>
//           </TouchableOpacity>
//           {isWhenVisible && (
//             <Text style={styles.sectionText}>
//               We believe in preventative medicine as the best approach to keeping our patients healthy. This includes annual wellness examinations, vaccinations on a one- or three-year basis, external and internal parasite prevention, and dietary management. Our doctors will help determine what vaccinations are appropriate according to you and your pet’s needs. We will discuss in detail what your options are to help you make the best possible health decisions for your pet.
//             </Text>
//           )}

//           {/* How Section */}
//           <TouchableOpacity onPress={() => setHowVisible(!isHowVisible)}>
//             <Text style={styles.sectionTitle}>How do wellness exams work?</Text>
//           </TouchableOpacity>
//           {isHowVisible && (
//             <View>
//               <Text style={styles.sectionText}>
//                 During a wellness exam, our veterinary team will start out by taking your pet's vital signs. Our veterinarian will perform a comprehensive examination of your pet from nose to tail and may also perform diagnostic tests such as blood work, urinalysis, or intestinal parasite tests. Depending on your pet’s life stage, vaccines may be administered, as well as disease screenings for heartworm, kidney, liver, blood disorders, and more.
//               </Text>

//               <Text style={styles.sectionText}>
//                 Wellness examinations do not necessarily mean that your pet is going to be subjected to complicated or costly medical tests and treatments. This allows us to prevent major health issues from developing undetected and gives us the opportunity to analyze and record baseline values such as temperature, body condition, and lab work. We measure these when your pet is healthy in order to provide better care in the event of illness or emergency. A dental health exam and a weight check are always important parts of a wellness exam, and may indicate problems that can progress rapidly and have significant impact on your pet's overall health.
//               </Text>

//               <Text style={styles.sectionText}>
//                 Early detection and correction of medical problems will help to ensure that your pet will live a long, healthy, and active life.
//               </Text>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 20 },
//   scrollViewContainer: {
//     padding: 20,
//   },
//   imageContainer: {
//     width: '100%',
//     height: 200,
//     marginTop: 20,
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   contentContainer: {
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     marginTop: 50,
//     fontFamily: "Helvetica",
//   },
//   head: {
//     textAlign: "center",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//     textDecorationLine: 'underline',
//   },
//   sectionText: {
//     fontSize: 16,
//     color: '#555',
//     lineHeight: 24,
//     marginBottom: 10,
//   },
//   backButton: {
//     padding: 10,
//     backgroundColor: '#000',
//     borderRadius: 5,
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 1,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default WellnessPreventiveScreen;


import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const WellnessPreventiveScreen = ({ navigation }) => {
  const [isOverviewVisible, setOverviewVisible] = useState(false);
  const [isWhyVisible, setWhyVisible] = useState(false);
  const [isWhenVisible, setWhenVisible] = useState(false);
  const [isHowVisible, setHowVisible] = useState(false);

  return (
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

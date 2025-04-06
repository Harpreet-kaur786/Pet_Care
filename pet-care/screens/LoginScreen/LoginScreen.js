
// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { TextInput, Button, Text, Avatar } from 'react-native-paper';
// import { auth, signInWithEmailAndPassword } from '../../firebaseConfig';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error("Login Error:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Avatar.Icon size={80} icon="login" style={styles.avatar} />
//       <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
//       <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
//       <Button mode="contained" onPress={handleLogin} style={styles.button}>Login</Button>
//       <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>Don't have an account? Sign up</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   avatar: { marginBottom: 20 },
//   input: { width: '100%', marginBottom: 10 },
//   button: { marginTop: 10, width: '100%' },
//   link: { marginTop: 10, color: 'blue' }
// });

// import React, { useState } from 'react';
// import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
// import { TextInput, Button, Text, Avatar, Card } from 'react-native-paper';
// import { auth, signInWithEmailAndPassword } from '../../firebaseConfig';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error("Login Error:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Top Image Container (50% height) */}
//       <View style={styles.imageContainerTop}>
//         <Image 
//           source={require('../../assets/pet3.jpg')} // Your top image here
//           style={styles.image}
//         />
//       </View>

//       {/* Card Container in the middle */}
//       <KeyboardAvoidingView 
//         style={styles.cardContainer} 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <Card style={styles.card}>
//           <Card.Content>
//             <TextInput 
//               label="Email" 
//               value={email} 
//               onChangeText={setEmail} 
//               style={styles.input} 
//             />
//             <TextInput 
//               label="Password" 
//               value={password} 
//               onChangeText={setPassword} 
//               secureTextEntry 
//               style={styles.input} 
//             />
//             <Button mode="contained" onPress={handleLogin} style={styles.button}>
//               Login
//             </Button>
//             <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
//               Don't have an account? Sign up
//             </Text>
//           </Card.Content>
//         </Card>
//       </KeyboardAvoidingView>

//       {/* Bottom Image Container (50% height) */}
//       <View style={styles.imageContainerBottom}>
//         <Image 
//           source={require('../../assets/pexels-basharkadi-2569498.jpg')} // Your bottom image here
//           style={styles.image}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
//   },
//   cardContainer: { 
//     position: 'absolute', 
//     top: '40%',  // Adjust this value to center the card
//     width: '90%', 
//     zIndex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light white background with some opacity
//     borderRadius: 10,
//     padding: 20,
//   },
//   card: { 
//     padding: 20, 
//     borderRadius: 10, 
//     elevation: 5, 
//     backgroundColor: 'transparent', // Transparent card background
//   },
//   input: { 
//     width: '100%', 
//     marginBottom: 10, 
//     backgroundColor: 'white' 
//   },
//   button: { 
//     marginTop: 10, 
//     width: '100%' 
//   },
//   link: { 
//     marginTop: 10, 
//     color: 'blue' 
//   },
//   imageContainerTop: { 
//     width: '100%', 
//     height: '50%', 
//   },
//   imageContainerBottom: { 
//     width: '100%', 
//     height: '50%',
//   },
//   image: { 
//     width: '100%', 
//     height: '100%', 
//     resizeMode: 'cover',
//   },
// });

import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Provider as PaperProvider,
  TextInput, 
  Button, 
  Text, 
  Avatar, 
  Card, 
  Dialog, 
  Portal, 
  Paragraph 
} from 'react-native-paper';
import { auth, signInWithEmailAndPassword } from '../../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertMessage('Please fill in both email and password.');
      setVisible(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      setAlertMessage('Invalid email or password. Please try again.');
      setVisible(true);
      console.error("Login Error:", error.message);
    }
  };

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Top Image */}
        <View style={styles.imageContainerTop}>
          <Image 
            source={require('../../assets/pet3.jpg')} 
            style={styles.image}
          />
        </View>

        {/* Card */}
        <KeyboardAvoidingView 
          style={styles.cardContainer} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Card style={styles.card}>
            <Card.Content>
              <TextInput 
                label="Email" 
                value={email} 
                onChangeText={setEmail} 
                style={styles.input} 
              />
              <TextInput 
                label="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
                style={styles.input} 
              />
              <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
              </Button>
              <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
                Don't have an account? Sign up
              </Text>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>

        {/* Bottom Image */}
        <View style={styles.imageContainerBottom}>
          <Image 
            source={require('../../assets/pexels-basharkadi-2569498.jpg')} 
            style={styles.image}
          />
        </View>

        {/* Alert Dialog */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{alertMessage}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cardContainer: { 
    position: 'absolute', 
    top: '40%', 
    width: '90%', 
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', 
    borderRadius: 10,
    padding: 20,
  },
  card: { 
    padding: 20, 
    borderRadius: 10, 
    elevation: 5, 
    backgroundColor: 'transparent', 
  },
  input: { 
    width: '100%', 
    marginBottom: 10, 
    backgroundColor: 'white' 
  },
  button: { 
    marginTop: 10, 
    width: '100%' 
  },
  link: { 
    marginTop: 10, 
    color: 'blue' 
  },
  imageContainerTop: { 
    width: '100%', 
    height: '50%', 
  },
  imageContainerBottom: { 
    width: '100%', 
    height: '50%',
  },
  image: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover',
  },
});

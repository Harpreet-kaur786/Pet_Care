
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import { auth, signInWithEmailAndPassword } from '../../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon="login" style={styles.avatar} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>Login</Button>
      <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>Don't have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  avatar: { marginBottom: 20 },
  input: { width: '100%', marginBottom: 10 },
  button: { marginTop: 10, width: '100%' },
  link: { marginTop: 10, color: 'blue' }
});

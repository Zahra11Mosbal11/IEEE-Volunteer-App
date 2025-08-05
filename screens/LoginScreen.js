import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('يرجى إدخال البريد وكلمة المرور');
      return;
    }
  
    try {
      const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        // لو login ناجح
        await login(data.token);
        navigation.navigate('Home');
      } else {
        alert(data.message || 'بيانات الدخول غير صحيحة');
      }
  
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء الاتصال بالخادم');
    }
  };
  
  return (
    
    <View style={styles.container}>
      <ImageBackground
      source={require('../assets/loginBackground.jpg')}
      style={styles.ImageBackground}
      resizeMode='cover'
    />
      <View style={styles.card}>
        <Image source={require('../assets/ieee.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Email@domain.TLD"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="P@$$WORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageBackground:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEE',
  },
  card: {
    
    width: '80%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#00629B',
    alignItems: 'center',
    boxShadow: '10',
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';


export default function HomeScreen() {
  const { userToken, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [message, setMessage] = useState('');

  const fetchProtectedData = async () => {
    try {
      const response = await fetch('https://ieee-sustech-sb-va.vercel.app/api/mobile/auth/success', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      const data = await response.json();
      console.log('Protected API Response:', data);
      setMessage(data.message);
    } catch (error) {
      console.error('Failed to fetch protected data:', error);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);


  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <Image source={require('../assets/ieee.png')} style={styles.logo} />
        <TouchableOpacity>
          <Image source={require('../assets/acount.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <TouchableOpacity style={styles.card} onPress={() => openModal('تفاصيل الشهادة')}>
        <Text style={styles.cardText}>استيفاء الشروط</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => openModal('تفاصيل الـ Flags')}>
        <Text style={styles.cardText}>عدد الـ Flags</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => openModal('تقييم الشهر الحالي')}>
        <Text style={styles.cardText}>التقييم</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{modalContent}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 20, color: '#0072C6' }}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  appBar: {
    backgroundColor: '#00629B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: { width: 60, height: 60, resizeMode: 'contain', padding:5 },
  icon: { width: 35, height: 35, resizeMode: 'contain', padding:5 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  cardText: { fontSize: 18, textAlign: 'center' },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff', padding: 25, borderRadius: 15, width: '80%', alignItems: 'center'
  },
});

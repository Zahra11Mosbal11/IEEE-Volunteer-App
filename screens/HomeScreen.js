import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, SafeAreaView,ImageBackground,ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/homeStyles';
import CircularProgress from 'react-native-circular-progress-indicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { fetchCertData } from '../api/certificateApi';
import CertificateModal from '../components/certificateModal';
import { fetchFlagsData } from '../api/flagsApi';
import FlagModal from '../components/FlagModal';




export default function HomeScreen() {
  const { userToken, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [message, setMessage] = useState('');
  const [certificateData, setCertificat] = useState([]);
  const [yellowCount, setYellowCount] = useState(0);
  const [redCount, setRedCount] = useState(0);
  const [yellowFlags, setYellowFlags] = useState([]);
  const [redFlags, setRedFlags] = useState([]);

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
  const fetchCert = async () => {
    try {
      const data = await fetchCertData(userToken);
      console.log('Certificate data:', data);
      setCertificat(data);
    } catch (error) {
      console.error('Failed to fetch certificate:', error);
    }
  };
  const fetchFlags = async () => {
    try {
      const data = await fetchFlagsData(userToken);
      console.log('Flags data:', data);
  
      const yellow = data.yellow_flags ? data.yellow_flags.filter(flag => flag.is_active) : [];
      const red = data.red_flags ? data.red_flags.filter(flag => flag.is_active) : [];
  
      setYellowFlags(yellow);
      setRedFlags(red);
      setYellowCount(yellow.length);
      setRedCount(red.length);
  
    } catch (error) {
      console.error('Failed to fetch flags:', error);
      setYellowFlags([]);
      setRedFlags([]);
      setYellowCount(0);
      setRedCount(0);
    }
  };
  useEffect(() => {
    fetchProtectedData();
    fetchFlags();
    fetchCert();
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
        <ScrollView >
        <ImageBackground
      source={require('../assets/loginBackground.jpg')}
      style={styles.ImageBackground}
      resizeMode='cover'
    />
      {/* Cards */}<TouchableOpacity style={[styles.card, { marginTop: 40 }]} activeOpacity={1} onPress={() => openModal('certificate')}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Text style={styles.modalTitle}>Certification Status</Text>
       <CircularProgress
      value={parseFloat(certificateData.percentage) || 0}
      radius={40}
      duration={1000}
      progressValueColor={'#000'}
      maxValue={100}
      valueSuffix='%'
      activeStrokeColor={'#00629B'}
      inActiveStrokeColor="#e0e0e0"
      inActiveStrokeOpacity={0.5}
      inActiveStrokeWidth={7}
      activeStrokeWidth={7}
      />
      <Text style={styles.footerText}>Completion of Certificate Criteria</Text>
      <Text style={{ fontSize: 12, color: '#888', marginTop: 20 }}>
      Tap for details
    </Text>
    
  </View>
</TouchableOpacity>

      <TouchableOpacity style={styles.card} activeOpacity={1} onPress={() => openModal('flags')}>
      <Text style={styles.modalTitle}>Flags</Text>
        <View style={styles.flagRow}>
          <Image source={require('../assets/yellow-flag.png')} style={styles.flagIcon} />
          //<Text style={styles.flagText}>Yellow Flags: {yellowCount}</Text>
        </View>
        <View style={styles.flagRow}>
            <Image source={require('../assets/red-flag.png')} style={styles.flagIcon} />
            <Text style={styles.flagText}> Red Flags: {redCount}</Text>
        </View>
            <Text style={styles.footerText}>
              Your rating this month should be 75% to get rid of one Y flag
            </Text>
            <Text style={{ fontSize: 12, color: '#888', marginTop: 20 }}>
      Tap for details
    </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} activeOpacity={1} onPress={() => openModal('تقييم الشهر الحالي')}>
        <Text style={styles.cardText}>التقييم</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            

            {/* flags modal */}
            {modalContent === 'flags' ? (
              <FlagModal
              yellowFlags={yellowFlags}
              redFlags={redFlags}
             
              />
            ) :  modalContent === 'certificate' ? (
              <CertificateModal
                certificateData={certificateData}
              />
            ) :(
              <Text style={styles.modalTitle}>{modalContent}</Text>
            )}

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ margin: 20, color: '#888' }}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  
    
  );
}

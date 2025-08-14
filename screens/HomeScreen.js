import React, { useContext, useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, SafeAreaView,ImageBackground,ScrollView } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/homeStyles';
import CircularProgress from 'react-native-circular-progress-indicator';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { fetchCertData } from '../api/certificateApi';
import CertificateModal from '../components/certificateModal';
import { fetchFlagsData } from '../api/flagsApi';
import FlagModal from '../components/FlagModal';
import DashedCircle from '../components/DashedCircle';
import RatingModal from '../components/RatingModal';




export default function HomeScreen() {
  const { userToken, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [modalContent, setModalContent] = useState('');
  const [message, setMessage] = useState('');
  const [certificateData, setCertificat] = useState([]);
  const [yellowCount, setYellowCount] = useState(0);
  const [redCount, setRedCount] = useState(0);
  const [yellowFlags, setYellowFlags] = useState([]);
  const [redFlags, setRedFlags] = useState([]);

  const toggleMenu = () => {
    if (menuOpen) {
      menuRef.current?.close();
    } else {
      menuRef.current?.open();
    }
    setMenuOpen(!menuOpen);
  };

  const userData = {
    name: "FirstName LastName",
    team: "Team",
    subteam: "Subteam",
    profilePic: require('../assets/profile.png')
  };

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
    
    <MenuProvider>
    <SafeAreaView style={styles.container}>

      {/* AppBar */}
      <View style={styles.appBar}>
        <Image source={require('../assets/ieee.png')} style={styles.logo} />
        <Menu
            ref={menuRef}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
          >
            <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }} onPress={toggleMenu}>
              <Image
                source={
                  menuOpen
                    ? require('../assets/close.png')
                    : require('../assets/acount.png')
                }
                style={styles.icon}
              />
            </MenuTrigger>
      
            <MenuOptions customStyles={{ optionsContainer: styles.popupContainer }}>
              <View style={{ alignItems: 'center', padding: 10 }}>
                <Image source={require('../assets/profile.png')} style={styles.avatar} />
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.team}>{`${userData.team} - ${userData.subteam}`}</Text>
              </View>
              <MenuOption onSelect={() => alert('Change password')}>
                <Text style={styles.menuItem}>Change Password</Text>
              </MenuOption>
              <MenuOption onSelect={logout}>
                <Text style={[styles.menuItem, { color: '#00629B' }]}>Log Out</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
      </View>
        <ScrollView >

        <ImageBackground
      source={require('../assets/loginBackground.jpg')}
      style={styles.ImageBackground}
      resizeMode= 'cover'
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

      <TouchableOpacity style={styles.card} activeOpacity={1} onPress={() => openModal('Rating')}>
        <Text style={styles.modalTitle}>Rating</Text>
        <View style={styles.flagRow}>
          <DashedCircle />
          <Text style={styles.flagText}> Average Rating</Text>
        </View>
        <View style={styles.flagRow}>
          <DashedCircle/>
          <Text style={styles.flagText}> Last month’s rating </Text>
        </View>
            <Text style={{ fontSize: 12, color: '#888', marginTop: 20 }}>
      Tap for details
    </Text>
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
            ):  modalContent === 'Rating' ? (
              <RatingModal/>
            ):(
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
    </MenuProvider>
    
  );
}
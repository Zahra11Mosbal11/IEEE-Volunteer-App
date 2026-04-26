import React, { useContext, useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, SafeAreaView,ImageBackground,ScrollView } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/homeStyles';
import CircularProgress from 'react-native-circular-progress-indicator';
import { MenuProvider } from 'react-native-popup-menu';
import NotificationMenuTrigger from '../components/NotificationMenuTrigger';
import ProfileMenuTrigger from '../components/ProfileMenuTrigger';
import { fetchCertData } from '../api/certificateApi';
import CertificateModal from '../components/CertificateModal';
import { fetchFlagsData } from '../api/flagsApi';
import { fetchProtectedData } from '../api/authApi';
import FlagModal from '../components/FlagModal';
import DashedCircle from '../components/DashedCircle';
import RatingModal from '../components/RatingModal';

/**
 * Main dashboard screen displaying user certificate progress, flags, and ratings.
 *
 * @returns {JSX.Element} The rendered HomeScreen component
 */
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
  const [hasNewNotifications, setHasNewNotifications] = useState(true);



  const userData = {
    name: "FirstName LastName",
    team: "Team",
    subteam: "Subteam",
    profilePic: require('../assets/profile.png')
  };

  /**
   * Fetches the protected dashboard data using the user's token.
   * Updates the local message state with the response.
   */
  const loadProtectedData = async () => {
    try {
      const data = await fetchProtectedData(userToken);
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
    loadProtectedData();
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
        
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <NotificationMenuTrigger 
            hasNewNotifications={hasNewNotifications}
            onMenuOpened={() => setHasNewNotifications(false)}
          />
          <ProfileMenuTrigger userData={userData} logout={logout} />
        </View>
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
         <Text style={styles.flagText}>Yellow Flags: {yellowCount}</Text> 
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
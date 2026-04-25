import React, { useRef, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import ChangePasswordModal from './ChangePasswordModal';
import styles from '../styles/homeStyles';

export default function ProfileMenuTrigger({ userData, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const menuRef = useRef(null);
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);

  const toggleMenu = () => {
    if (menuOpen) {
      menuRef.current?.close();
    } else {
      menuRef.current?.open();
    }
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout(); // Calls AuthContext logout
    navigation.replace('Login'); // Redirects to Login
  };

  return (
    <>
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
            style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 10}}
          />
        </MenuTrigger>

        <MenuOptions customStyles={{ optionsContainer: styles.popupContainer }}>
          <View style={{ alignItems: 'center', padding: 10 }}>
            <Image source={require('../assets/profile.png')} style={styles.avatar} />
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.team}>{`${userData.team} - ${userData.subteam}`}</Text>
          </View>
          <MenuOption onSelect={() => {
            menuRef.current?.close();
            setPasswordModalVisible(true);
          }}>
            <Text style={styles.menuItem}>Change Password</Text>
          </MenuOption>
          <MenuOption onSelect={handleLogout}>
            <Text style={[styles.menuItem, { color: '#00629B' }]} >Log Out</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <ChangePasswordModal 
        visible={passwordModalVisible} 
        onClose={() => setPasswordModalVisible(false)} 
        token={userToken} 
      />
    </>
  );
}

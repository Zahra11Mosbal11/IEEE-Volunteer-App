import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/homeStyles';

/**
 * Modal component that displays the user's account details (avatar, name, team)
 * and provides options to change password and log out.
 *
 * @param {Object} props - React props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Object} props.userData - User profile data (name, team, subteam, profilePic)
 * @param {Function} props.onLogout - Callback function handling user logout
 * @returns {JSX.Element} The AccountModal component
 */
export default function AccountModal({ visible, onClose, userData, onLogout }) {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: 'flex-start', alignItems: 'flex-end' }}
    >
      <ScrollView style={[styles.accountBox, { width: 300, backgroundColor: 'white', padding: 20 }]}>
        <Image source={{ uri: userData.profilePic }} style={styles.avatar} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.team}>{`${userData.team} - ${userData.subteam}`}</Text>

        <TouchableOpacity style={styles.changePassword}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout} onPress={onLogout}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}
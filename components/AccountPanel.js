import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/homeStyles';

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
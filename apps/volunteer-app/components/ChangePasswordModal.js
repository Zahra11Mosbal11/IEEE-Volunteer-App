import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { updatePassword } from '../api/changePass';
import styles from '../styles/homeStyles';

export default function ChangePasswordModal({ visible, onClose, token }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      alert('Please fill out all fields');
      return;
    }
    
    setLoading(true);
    try {
      await updatePassword(token, oldPassword, newPassword);
      alert('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Password</Text>

          <View style={localStyles.inputContainer}>
            <TextInput
              style={localStyles.inputField}
              placeholder="Old Password"
              placeholderTextColor="#888"
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              onChangeText={setOldPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={{ padding: 5 }}>
              {showOldPassword ? <EyeOff color="#666" size={20} /> : <Eye color="#666" size={20} />}
            </TouchableOpacity>
          </View>

          <View style={localStyles.inputContainer}>
            <TextInput
              style={localStyles.inputField}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={{ padding: 5 }}>
              {showNewPassword ? <EyeOff color="#666" size={20} /> : <Eye color="#666" size={20} />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={localStyles.button} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={localStyles.buttonText}>Update Password</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={{ color: '#888', padding: 10 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const localStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#00629B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

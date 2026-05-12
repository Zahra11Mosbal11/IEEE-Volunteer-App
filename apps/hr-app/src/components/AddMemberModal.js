/**
 * @file AddMemberModal.js
 * @description Modal component for adding or editing a team member.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { X, Calendar } from 'lucide-react-native';

/**
 * AddMemberModal Component
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Function to close the modal
 * @param {boolean} props.isEditMode - Whether the modal is in edit mode
 * @param {Object} props.formData - Current form data
 * @param {Function} props.setFormData - Function to update form data
 * @param {Function} props.onSave - Function to save the member
 * @param {boolean} props.processing - Whether a request is being processed
 */
const AddMemberModal = ({ 
  visible, 
  onClose, 
  isEditMode, 
  formData, 
  setFormData, 
  onSave, 
  processing 
}) => {
  


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{isEditMode ? 'Edit Team Member' : 'Add Team Member'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name *</Text>
              <TextInput 
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput 
                style={styles.input}
                placeholder="john@example.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
              />
            </View>

            {/* Position */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Position *</Text>
              <TextInput 
                style={styles.input}
                placeholder="e.g., President, Vice President, Technica"
                placeholderTextColor="#999"
                value={formData.position}
                onChangeText={(text) => setFormData({...formData, position: text})}
              />
            </View>


            {/* Join Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Join Date</Text>
              <View style={styles.dateInputContainer}>
                <TextInput 
                  style={styles.dateInput}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#999"
                  value={formData.joinDate}
                  onChangeText={(text) => setFormData({...formData, joinDate: text})}
                />
                <Calendar size={20} color="#333" />
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.createButton} 
              onPress={onSave}
              disabled={processing}
            >
              {processing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.createButtonText}>{isEditMode ? 'Save Changes' : 'Create'}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: '90%',
    width: '100%',
    overflow: 'hidden',
  },
  modalHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateInputContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 15,
    color: '#000',
  },
  dateInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    padding: 0, // Remove default padding to fit in container
  },

  modalFooter: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  createButton: {
    backgroundColor: '#05070A', // Near black
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddMemberModal;

/**
 * @file AddMeetingModal.js
 * @description Modal component for adding or editing a meeting matching the centered design.
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
 * AddMeetingModal Component
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Function to close the modal
 * @param {boolean} props.isEditMode - Whether the modal is in edit mode
 * @param {Object} props.formData - Current form data
 * @param {Function} props.setFormData - Function to update form data
 * @param {Function} props.onSave - Function to save the meeting
 * @param {boolean} props.processing - Whether a request is being processed
 */
const AddMeetingModal = ({ 
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
      animationType="fade"
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
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#64748B" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{isEditMode ? 'Edit Meeting' : 'Add Meeting'}</Text>
            <Text style={styles.modalSubtitle}>
              {isEditMode ? 'Update the details of the meeting.' : 'Fill out the form to create a new meeting.'}
            </Text>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title *</Text>
              <TextInput 
                style={styles.input}
                placeholder="e.g., Weekly Team Meeting"
                placeholderTextColor="#94A3B8"
                value={formData.title}
                onChangeText={(text) => setFormData({...formData, title: text})}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Meeting agenda or notes..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                value={formData.description}
                onChangeText={(text) => setFormData({...formData, description: text})}
              />
            </View>

            {/* Date & Time */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date & Time *</Text>
              <View style={styles.inputWithIcon}>
                <TextInput 
                  style={[styles.inputInner, { flex: 0.6 }]}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#94A3B8"
                  value={formData.date}
                  onChangeText={(text) => setFormData({...formData, date: text})}
                />
                <View style={styles.divider} />
                <TextInput 
                  style={[styles.inputInner, { flex: 0.4 }]}
                  placeholder="HH:mm"
                  placeholderTextColor="#94A3B8"
                  value={formData.time}
                  onChangeText={(text) => setFormData({...formData, time: text})}
                />
                <Calendar size={20} color="#0F172A" />
              </View>
            </View>

            {/* Google Meet Link */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Google Meet Link</Text>
              <TextInput 
                style={styles.input}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                placeholderTextColor="#94A3B8"
                value={formData.meetingCode && !formData.meetingCode.startsWith('http') ? `https://meet.google.com/${formData.meetingCode}` : formData.meetingCode}
                onChangeText={(text) => {
                  // If it's a full URL, we might want to extract the code for the API
                  // but for now let's just store it. The API logic in MeetingsScreen 
                  // can handle extraction if needed.
                  setFormData({...formData, meetingCode: text});
                }}
              />
              <Text style={styles.helpText}>
                Optional: Add the Google Meet link to enable attendance tracking
              </Text>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={onSave}
              disabled={processing}
            >
              {processing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.saveButtonText}>{isEditMode ? 'Update' : 'Create'}</Text>
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
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },
  modalBody: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  inputInner: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  helpText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
    lineHeight: 18,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#E2E8F0',
    marginHorizontal: 12,
  },
  modalFooter: {
    marginTop: 10,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#05070A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddMeetingModal;



import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import DashedCircle from './DashedCircle';
import styles from '../styles/homeStyles';

/**
 * Modal component that displays the user's monthly rating
 * along with visual feedback.
 *
 * @returns {JSX.Element} The RatingModal component
 */
export default function RatingModal() {
  return (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <View >
      <Text style={styles.modalTitle}>Your Rating</Text>
      <DashedCircle/>
      <Text style={styles.footerText}>You can do better! 💪 </Text>
      </View>

    </ScrollView>
  );
}
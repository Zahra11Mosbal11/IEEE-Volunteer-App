import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import styles from '../styles/homeStyles';

export default function FlagsModal({ yellowFlags, redFlags, onClose }) {
  return (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>Your Flags</Text>
      {yellowFlags.length === 0 ? (
        <Text style={styles.flagText}>No yellow flags</Text>
      ) : yellowFlags.map(flag => (
        <View key={flag.id} style={styles.flagRow}>
          <Image source={require('../assets/yellow-flag.png')} style={styles.flagIcon} />
          <Text style={styles.flagText}>
          {new Date(flag.givenAt).toLocaleDateString()} {flag.reason}
          </Text>
        </View>
      ))}

     
      {redFlags.length === 0 ? (
        <Text style={styles.flagText}>No red flags</Text>
      ) : redFlags.map(flag => (
        <View key={flag.id} style={styles.flagRow}>
          <Image source={require('../assets/red-flag.png')} style={styles.flagIcon} />
          <Text style={styles.flagText}>
           {new Date(flag.givenAt).toLocaleDateString()} {flag.reason} 
          </Text>
        </View>
      ))}
       <Text style={styles.footerText}>
        A rating of 75% or higher will remove that red flag for you!
      </Text>
      <Text style={[styles.footerText, { fontWeight: 'bold' }]}>
        You can do it! Good luck!
      </Text>

    </ScrollView>
  );
}
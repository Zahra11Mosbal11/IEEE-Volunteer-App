import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';


export default function FlagsModal({ yellowFlags, redFlags, onClose }) {
  return (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>Your Flags</Text>
      {yellowFlags.length === 0 ? (
        <Text style={styles.flagText}>No yellow flags</Text>
      ) : yellowFlags.map(flag => (
        <View key={flag.id} style={styles.flagMRow}>
          <Image source={require('../assets/yellow-flag.png')} style={styles.flagIcon} />
          <Text style={styles.flagText}>
          {new Date(flag.givenAt).toLocaleDateString()} {flag.reason}
          </Text>
        </View>
      ))}

     
      {redFlags.length === 0 ? (
        <Text style={styles.flagText}>No red flags</Text>
      ) : redFlags.map(flag => (
        <View key={flag.id} style={styles.flagMRow}>
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
const styles = StyleSheet.create({
 
  modalContent: {
    backgroundColor: '#fff', padding: 5, borderRadius: 15, width: '80%', alignItems: 'center'
  },
  flagMRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
  },
  flagIcon: {
    justifyContent: 'flex-start',
    width: 30,
    height: 30,
    resizeMode: 'contain',
   

  },
  flagText: {
    alignItems: 'flex',
    justifyContent: 'center',
    fontSize: 14,
    color: '#333',
    flex: 1,
    
  },
  footerText: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginBottom: 20,
  },
  })
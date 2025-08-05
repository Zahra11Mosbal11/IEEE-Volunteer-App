// certificateModal.js
import React from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CheckCircle, AlertCircle } from 'lucide-react-native';

const CertificateModal = ({certificateData }) => {
  const fulfilled = [
    ...(certificateData.general?.fulfilled || []),
    ...(certificateData.team?.fulfilled || [])
  ];

  const suggestions = certificateData?.suggestions || [];

  return (

          <ScrollView>
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
    
  </View>
            <Text style={styles.sectionTitle}>fulfilled Conditions:</Text>
            {fulfilled.length > 0 ? (
              fulfilled.map((item, index) => (
                <View key={index} style={styles.item}>
                  <CheckCircle color="#4CAF50" size={18} />
                  <Text style={styles.itemText}>{item.description}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.itemText}>لا توجد شروط مستوفاة بعد.</Text>
            )}

            <Text style={styles.sectionTitle}>Suggestions:</Text>
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <View key={index} style={styles.item}>
                  <AlertCircle color="#FF9800" size={18} />
                  <Text style={styles.itemText}>{item.description}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.itemText}>لا توجد اقتراحات حالياً.</Text>
            )}
          </ScrollView>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    padding: 10,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  itemText: {
    marginLeft: 8,
    fontSize: 15
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
});

export default CertificateModal;

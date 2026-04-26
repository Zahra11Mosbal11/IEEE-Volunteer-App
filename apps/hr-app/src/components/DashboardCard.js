import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const DashboardCard = ({ title, value, icon: Icon, color = '#0066FF', onLinkPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {Icon && <Icon color="#B0B0B0" size={24} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity style={styles.linkContainer} onPress={onLinkPress}>
          <Text style={[styles.linkText, { color }]}>View all {title.toLowerCase().split(' ')[1] || title.toLowerCase()} →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  content: {
    gap: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  linkContainer: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DashboardCard;

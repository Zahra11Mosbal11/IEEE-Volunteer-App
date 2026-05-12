/**
 * @file MetricCard.js
 * @description Small card component for displaying individual analytics metrics.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * MetricCard Component
 * @param {Object} props - Component props
 * @param {string} props.title - Label for the metric
 * @param {string|number} props.value - Value to display
 * @param {string} [props.valueColor='#000000'] - Optional color for the value text
 */
const MetricCard = ({ title, value, valueColor = '#000000' }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flex: 1,
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 15,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MetricCard;

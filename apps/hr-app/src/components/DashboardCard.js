/**
 * @file DashboardCard.js
 * @description Card component for displaying metrics on the home dashboard matching the provided design.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * DashboardCard Component
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the metric
 * @param {string} props.value - Value to display
 * @param {React.Component} props.icon - Lucide icon component
 * @param {string} props.color - Color for the link text
 * @param {Function} props.onLinkPress - Function called when link is pressed
 */
const DashboardCard = ({ title, value, icon: Icon, color = '#2563EB', onLinkPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {Icon && <Icon color="#94A3B8" size={20} />}
      </View>
      
      <Text style={styles.value}>{value}</Text>
      
      <TouchableOpacity style={styles.linkContainer} onPress={onLinkPress}>
        <Text style={[styles.linkText, { color }]}>
          {title === 'Analytics' ? 'View analytics' : `View all ${title.toLowerCase().split(' ')[1] || title.toLowerCase()}`} →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 4,
  },
  linkContainer: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DashboardCard;



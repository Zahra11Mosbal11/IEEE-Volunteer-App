import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusCard = ({ title, subtitle, description, icon: Icon, color, backgroundColor, borderColor }) => {
  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}>
      <View style={styles.header}>
        {Icon && <Icon size={20} color={color} />}
        <Text style={[styles.title, { color }]}>{title}</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 20,
  },
  content: {
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
});

export default StatusCard;

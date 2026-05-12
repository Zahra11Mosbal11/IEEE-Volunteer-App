/**
 * @file MemberCard.js
 * @description Component for displaying a single team member's information without icons and allowing editing for all.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2, Edit } from 'lucide-react-native';

/**
 * MemberCard Component
 * @param {Object} props - Component props
 * @param {Object} props.member - The member data to display
 * @param {Function} props.onEdit - Function called when edit icon is pressed
 * @param {Function} props.onDelete - Function called when delete icon is pressed
 */
const MemberCard = ({ member, onEdit, onDelete }) => {
  const roleDisplay = member.role || member.position || 'Volunteer';
  // Check both 'isActive' boolean and 'status' string for backward compatibility
  const isInactive = member.isActive === false || member.status === 'inactive';
  
  return (
    <View style={[styles.card, isInactive && styles.inactiveCard]}>
      <View style={styles.cardContent}>
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, isInactive && styles.inactiveText]}>{member.name || 'Anonymous'}</Text>
            {isInactive && (
              <View style={styles.inactiveBadge}>
                <Text style={styles.inactiveBadgeText}>Inactive</Text>
              </View>
            )}
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailText, isInactive && styles.inactiveText]}>{roleDisplay}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={() => onEdit(member)} 
            style={[styles.actionButton, styles.editButton]}
          >
            <Edit size={18} color={isInactive ? "#94A3B8" : "#2563EB"} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => onDelete(member.id || member._id)} 
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Trash2 size={18} color={isInactive ? "#CBD5E1" : "#DC2626"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  inactiveCard: {
    opacity: 0.6,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    shadowOpacity: 0.02,
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  inactiveText: {
    color: '#7e8b9eff',
  },
  inactiveBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inactiveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#758396ff',
    textTransform: 'uppercase',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  detailText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default MemberCard;




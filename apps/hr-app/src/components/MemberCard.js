import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2, Edit } from 'lucide-react-native';

const MemberCard = ({ member, onEdit, onDelete }) => {
  const roleDisplay = member.role || member.position || 'N/A';

  return (
    <View style={styles.memberCard}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberPosition}>{roleDisplay}</Text>
      </View>
      <View style={styles.memberActions}>

        <TouchableOpacity onPress={() => onEdit(member)} style={styles.actionIcon}>
          <Edit size={18} color="#2563EB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(member.id || member._id)} style={styles.actionIcon}>
          <Trash2 size={18} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  memberPosition: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },

});

export default MemberCard;

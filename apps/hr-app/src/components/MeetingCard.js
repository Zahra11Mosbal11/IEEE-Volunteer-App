/**
 * @file MeetingCard.js
 * @description Component for displaying a single meeting's information matching the design and API structure.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Calendar, Trash2, Pencil, ExternalLink } from 'lucide-react-native';

/**
 * MeetingCard Component
 * @param {Object} props - Component props
 * @param {Object} props.meeting - The meeting data to display
 * @param {Function} props.onEdit - Function called when edit icon is pressed
 * @param {Function} props.onDelete - Function called when delete icon is pressed
 */
const MeetingCard = ({ meeting, onEdit, onDelete }) => {
  // Format date and time from ISO startTime
  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  };

  const meetUrl = meeting.meetingCode ? `https://meet.google.com/${meeting.meetingCode}` : null;

  const handleOpenLink = () => {
    if (meetUrl) {
      Linking.openURL(meetUrl).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Calendar size={24} color="#94A3B8" style={styles.calendarIcon} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{meeting.title || 'Untitled Meeting'}</Text>
            <Text style={styles.dateTime}>{formatDateTime(meeting.startTime)}</Text>
            <Text style={styles.location}>{meeting.description || 'No description'}</Text>
            
            {meeting.meetingCode && (
              <TouchableOpacity onPress={handleOpenLink} style={styles.linkContainer}>
                <Text style={styles.linkText}>Join Google Meet</Text>
                <ExternalLink size={14} color="#2563EB" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => onEdit(meeting)} style={styles.actionIcon}>
            <Pencil size={18} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(meeting.id || meeting._id)} style={styles.actionIcon}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    padding: 16,
  },
  cardContent: {
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  calendarIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    gap: 16,
  },
  actionIcon: {
    padding: 4,
  },
});

export default MeetingCard;



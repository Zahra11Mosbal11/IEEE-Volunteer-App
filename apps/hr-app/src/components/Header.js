import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';

const Header = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => navigation.openDrawer()}
      >
        <Menu size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.notificationContainer}>
            <Bell size={24} color="#333" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SJ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginLeft: 5,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Header;

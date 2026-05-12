/**
 * @file CustomDrawerContent.js
 * @description Custom layout for the sidebar/drawer navigation.
 * Includes navigation links and a logout button.
 */

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Home, Users, BarChart3, Calendar, LogOut } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

/**
 * DrawerItem Component
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the item
 * @param {React.Component} props.icon - Lucide icon component
 * @param {boolean} props.active - Whether the item is currently active
 * @param {Function} props.onPress - Function called when item is pressed
 */
const DrawerItem = ({ label, icon: Icon, active, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.drawerItem, active && styles.activeItem]} 
      onPress={onPress}
    >
      <Icon size={22} color="#FFFFFF" />
      <Text style={styles.drawerLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * CustomDrawerContent Component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @param {Object} props.state - Navigation state object
 */
const CustomDrawerContent = ({ navigation, state }) => {
  const { logout } = useContext(AuthContext);
  const currentRouteName = state.routeNames[state.index];

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const menuItems = [
    { name: 'Home', label: 'Home', icon: Home },
    { name: 'TeamMembers', label: 'Team Members', icon: Users },
    { name: 'Analytics', label: 'Analytics', icon: BarChart3 },
    { name: 'Meetings', label: 'Meetings', icon: Calendar },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <DrawerItem
            key={item.name}
            label={item.label}
            icon={item.icon}
            active={currentRouteName === item.name}
            onPress={() => navigation.navigate(item.name)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={22} color="#FFFFFF" />
          <Text style={styles.logoutLabel}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005596', // Deep blue from screenshot
  },
  menuContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    gap: 8,
   
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  activeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  drawerLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  logoutLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;

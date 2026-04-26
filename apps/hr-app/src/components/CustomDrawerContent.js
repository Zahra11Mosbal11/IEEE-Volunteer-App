import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Home, Users, BarChart3, Calendar } from 'lucide-react-native';

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

const CustomDrawerContent = ({ navigation, state }) => {
  const currentRouteName = state.routeNames[state.index];

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
});

export default CustomDrawerContent;

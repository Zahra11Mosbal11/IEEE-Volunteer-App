/**
 * @file AppNavigator.js
 * @description Main navigation configuration for the HR app.
 * Handles both Stack and Drawer navigation structures.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TeamMembersScreen from '../screens/TeamMembersScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import MeetingsScreen from '../screens/MeetingsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/**
 * MainDrawer Component
 * Defines the drawer-based navigation for the main application areas.
 * @returns {React.ReactElement} The Drawer navigator
 */
function MainDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="TeamMembers" component={TeamMembersScreen} />
      <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
      <Drawer.Screen name="Meetings" component={MeetingsScreen} />
    </Drawer.Navigator>
  );
}

/**
 * AppNavigator Component
 * The root navigator that switches between Login and the main application (MainDrawer).
 * @returns {React.ReactElement} The root Stack navigator
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

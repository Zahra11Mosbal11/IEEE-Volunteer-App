import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import TeamMembersScreen from './src/screens/TeamMembersScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import MeetingsScreen from './src/screens/MeetingsScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
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
    </NavigationContainer>
  );
}

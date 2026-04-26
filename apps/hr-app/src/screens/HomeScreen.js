import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Menu, Bell, Users, Calendar, TrendingUp, Flag, Award, AlertCircle } from 'lucide-react-native';
import DashboardCard from '../components/DashboardCard';
import StatusCard from '../components/StatusCard';

import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.homeTitle}>Home</Text>
          <Text style={styles.subtitle}>Welcome to the IEEE Student Branch HR Dashboard</Text>
        </View>

        {/* Dashboard Cards */}
        <DashboardCard 
          title="Total Members" 
          value="0" 
          icon={Users} 
          onLinkPress={() => {}} 
        />
        
        <DashboardCard 
          title="Total Meetings" 
          value="0" 
          icon={Calendar} 
          onLinkPress={() => {}} 
        />

        <DashboardCard 
          title="Analytics" 
          value="Active" 
          icon={TrendingUp} 
          onLinkPress={() => {}} 
        />

        {/* Top Performers Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No team members yet</Text>
          </View>
        </View>

        {/* Members with Flags Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Members with Flags</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No flags recorded</Text>
          </View>
        </View>

        {/* Status Cards */}
        <StatusCard 
          title="Rising Stars"
          subtitle="High performers with excellent attendance and minimal flags"
          description="No rising stars yet. Team members with rating ≥8, attendance ≥80%, and ≤1 flag will appear here."
          icon={Award}
          color="#2563EB"
          backgroundColor="#EFF6FF"
          borderColor="#DBEAFE"
        />

        <StatusCard 
          title="Needs Attention"
          subtitle="Team members who may benefit from additional support"
          description="All team members are performing well! Members with rating <6 will appear here."
          icon={AlertCircle}
          color="#EA580C"
          backgroundColor="#FFF7ED"
          borderColor="#FFEDD5"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomeSection: {
    marginVertical: 25,
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    lineHeight: 22,
  },
  sectionContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 15,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});

export default HomeScreen;

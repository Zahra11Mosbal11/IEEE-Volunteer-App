/**
 * @file HomeScreen.js
 * @description The main dashboard screen for the HR app connected to real data while following the exact design provided.
 */

import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Users, Calendar, TrendingUp, Award, AlertCircle } from 'lucide-react-native';
import DashboardCard from '../components/DashboardCard';
import StatusCard from '../components/StatusCard';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

/**
 * HomeScreen Component
 */
const HomeScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalMeetings: 0,
  });

  const USERS_API = 'https://ieee-sustech-sb-va.vercel.app/api/mobile/users';
  const MEETINGS_API = 'https://ieee-sustech-sb-va.vercel.app/api/mobile/meetings';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${userToken}` };
      const [usersRes, meetingsRes] = await Promise.all([
        fetch(USERS_API, { headers }),
        fetch(MEETINGS_API, { headers })
      ]);

      const usersData = await usersRes.json();
      const meetingsData = await meetingsRes.json();

      setStats({
        totalMembers: Array.isArray(usersData) ? usersData.length : 0,
        totalMeetings: Array.isArray(meetingsData) ? meetingsData.length : 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563EB" />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.homeTitle}>Home</Text>
          <Text style={styles.subtitle}>Welcome to the IEEE Student Branch HR Dashboard</Text>
        </View>

        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0F172A" />
          </View>
        ) : (
          <>
            {/* Dashboard Cards */}
            <DashboardCard 
              title="Total Members" 
              value={stats.totalMembers.toString()} 
              icon={Users}
              onLinkPress={() => navigation.navigate('TeamMembers')} 
            />
            
            <DashboardCard 
              title="Total Meetings" 
              value={stats.totalMeetings.toString()} 
              icon={Calendar}
              onLinkPress={() => navigation.navigate('Meetings')} 
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    marginBottom: 24,
    marginTop: 10,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    lineHeight: 20,
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 15,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
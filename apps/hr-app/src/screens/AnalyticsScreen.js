import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';

const AnalyticsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Performance insights and trends</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.row}>
            <MetricCard title="Avg Rating" value="0/10" />
            <MetricCard title="Avg Attendance" value="0%" />
          </View>
          <View style={styles.row}>
            <MetricCard title="Yellow Flags" value="0" valueColor="#EA580C" />
            <MetricCard title="Red Flags" value="0" valueColor="#DC2626" />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Performance Overview (Top 10)</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No data available</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Flags by Member (Top 10)</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No flags recorded</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Department Distribution</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No departments</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Detailed Member Statistics</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No team members</Text>
          </View>
        </View>

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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  titleSection: {
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 10,
  },
  grid: {
    gap: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});

export default AnalyticsScreen;

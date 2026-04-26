import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import Header from '../components/Header';

const TeamMembersScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Team Members</Text>
          <Text style={styles.subtitle}>Manage your IEEE student branch team</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Member</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search members..." 
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.emptyText}>No team members yet. Add your first member!</Text>
        </View>
      </ScrollView>

      {/* Decorative Background Circles (similar to screenshot) */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative',
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    zIndex: 1,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
    gap: 8,
    marginBottom: 25,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
  },
  circle1: {
    position: 'absolute',
    bottom: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#E0F2FE',
    opacity: 0.5,
    zIndex: 0,
  },
  circle2: {
    position: 'absolute',
    bottom: -50,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#E0F2FE',
    opacity: 0.5,
    zIndex: 0,
  },
});

export default TeamMembersScreen;

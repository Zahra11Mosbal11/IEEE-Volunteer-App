/**
 * @file TeamMembersScreen.js
 * @description Screen for managing IEEE student branch team members.
 * Refined with background decorations, a left-aligned action button, and a unified card layout.
 */

import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator, 
  Alert,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Search, Plus, Users } from 'lucide-react-native';
import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import AddMemberModal from '../components/AddMemberModal';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const API_URL = 'https://ieee-sustech-sb-va.vercel.app/api/mobile/users';

/**
 * TeamMembersScreen Component
 */
const TeamMembersScreen = ({ navigation }) => {
  const { userToken, logout } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', position: '',
    joinDate: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    if (!refreshing) setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });

      if (response.status === 401) {
        await logout();
        navigation.replace('Login');
        return;
      }

      const data = await response.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch team members');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMembers();
  };

  const handleSaveMember = async () => {
    const { name, email, position } = formData;
    if (!name || !email || !position) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }

    setProcessing(true);
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `${API_URL}/${selectedMemberId}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.position,
          joinDate: formData.joinDate,
        }),
      });

      if (response.status === 401) {
        await logout();
        navigation.replace('Login');
        return;
      }

      if (response.ok) {
        Alert.alert('Success', `Member ${isEditMode ? 'updated' : 'added'} successfully`);
        closeModal();
        fetchMembers();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save member');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the member');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteMember = (id) => {
    Alert.alert(
      'Delete Member',
      'Are you sure you want to remove this team member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${userToken}` }
              });
              if (response.ok) fetchMembers();
            } catch (error) {
              Alert.alert('Error', 'An error occurred');
            }
          }
        }
      ]
    );
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      name: '', email: '', position: '',
      joinDate: new Date().toLocaleDateString(),
    });
    setIsModalVisible(true);
  };

  const openEditModal = (member) => {
    setIsEditMode(true);
    setSelectedMemberId(member.id || member._id);
    setFormData({
      name: member.name,
      email: member.email,
      position: member.role || member.position,
      joinDate: member.joinDate || new Date().toLocaleDateString(),
    });
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const filteredMembers = members.filter(m => {
    const name = m.name?.toLowerCase() || '';
    const role = (m.role || m.position)?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return name.includes(query) || role.includes(query);
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.bgDecoration1} />
      <View style={styles.bgDecoration2} />

      <Header navigation={navigation} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Team Members</Text>
          <Text style={styles.subtitle}>Manage your IEEE student branch team</Text>
          
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Member</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.searchBar}>
            <Search size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search members..." 
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.listContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0F172A" style={{ marginVertical: 40 }} />
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map(member => (
                <MemberCard 
                  key={member.id || member._id} 
                  member={member} 
                  onEdit={openEditModal} 
                  onDelete={handleDeleteMember} 
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Users size={40} color="#E2E8F0" />
                <Text style={styles.emptyText}>
                  {searchQuery ? 'No members found' : 'No team members yet. Add your first member!'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <AddMemberModal 
        visible={isModalVisible}
        onClose={closeModal}
        isEditMode={isEditMode}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveMember}
        processing={processing}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  bgDecoration1: {
    position: 'absolute',
    top: -50,
    left: -100,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: '#E6F0FF',
    zIndex: -1,
  },
  bgDecoration2: {
    position: 'absolute',
    bottom: -150,
    right: -100,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#E6F0FF',
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#05070A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  listContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    gap: 12,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default TeamMembersScreen;

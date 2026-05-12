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
  Alert 
} from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import AddMemberModal from '../components/AddMemberModal';
import { AuthContext } from '../context/AuthContext';

const API_URL = 'https://ieee-sustech-sb-va.vercel.app/api/mobile/users';

const TeamMembersScreen = ({ navigation }) => {
  const { userToken, logout } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    joinDate: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
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
      if (Array.isArray(data)) {
        setMembers(data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMember = async () => {
    const { name, email, position } = formData;

    // Basic Validation
    if (!name || !email || !position) {
      Alert.alert('Required Fields', 'Please fill in all required fields marked with *');
      return;
    }

    // Name Validation
    if (name.trim().length < 2) {
      Alert.alert('Invalid Name', 'Name must be at least 2 characters long');
      return;
    }

    // Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
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
          role: formData.position, // Mapping form 'position' to API 'role'
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

              if (response.status === 401) {
                await logout();
                navigation.replace('Login');
                return;
              }

              if (response.ok) {
                Alert.alert('Deleted', 'Member removed successfully');
                // Optional: still fetch to ensure sync with server
                fetchMembers();
              }
            } catch (error) {
              Alert.alert('Error', 'An error occurred');
            }
          }
        }
      ]
    );
  };

  const openEditModal = (member) => {
    setIsEditMode(true);
    setSelectedMemberId(member.id || member._id);
    setFormData({
      name: member.name,
      email: member.email,
      position: member.role || member.position, // Map API 'role' back to form 'position'
      joinDate: member.joinDate || new Date().toLocaleDateString(),
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setSelectedMemberId(null);
    setFormData({
      name: '', email: '', position: '',
      joinDate: new Date().toLocaleDateString(),
    });
  };

  const filteredMembers = members.filter(m => {
    const name = m.name?.toLowerCase() || '';
    const role = (m.role || m.position)?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    return name.includes(query) || role.includes(query);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Team Members</Text>
          <Text style={styles.subtitle}>Manage your IEEE student branch team</Text>
        </View>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => { setIsEditMode(false); setIsModalVisible(true); }}
        >
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.contentCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : filteredMembers.length > 0 ? (
            <View style={styles.membersList}>
              {filteredMembers.map(member => (
                <MemberCard 
                  key={member.id || member._id} 
                  member={member} 
                  onEdit={openEditModal} 
                  onDelete={handleDeleteMember} 
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>
              {searchQuery ? 'No members match your search.' : 'No team members yet.'}
            </Text>
          )}
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: '#0F172A',
  },
  contentCard: {
    flex: 1,
  },
  membersList: {
    gap: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 15,
    marginTop: 40,
  },
});

export default TeamMembersScreen;

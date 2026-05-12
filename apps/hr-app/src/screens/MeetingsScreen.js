/**
 * @file MeetingsScreen.js
 * @description Screen for managing team meetings and tracking attendance.
 * Refined to match the provided design precisely.
 */

import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Dimensions
} from 'react-native';
import { Search, Plus, Calendar as CalendarIcon } from 'lucide-react-native';
import Header from '../components/Header';
import MeetingCard from '../components/MeetingCard';
import AddMeetingModal from '../components/AddMeetingModal';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const API_URL = 'https://ieee-sustech-sb-va.vercel.app/api/mobile/meetings';

/**
 * MeetingsScreen Component
 * @param {Object} props - Navigation props
 * @returns {React.ReactElement} The MeetingsScreen component
 */
const MeetingsScreen = ({ navigation }) => {
  const { userToken, logout } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    meetingCode: '',
    description: '',
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
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
      if (Array.isArray(data)) {
        setMeetings(data);
      } else {
        setMeetings([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load meetings.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMeetings();
  };

  const handleSaveMeeting = async () => {
    const { title, date, time, meetingCode, description } = formData;
    if (!title || !date || !time) {
      Alert.alert('Required Fields', 'Please fill in Title, Date, and Time');
      return;
    }

    // Combine date and time into ISO string
    let startTime;
    try {
      // Ensure date is YYYY-MM-DD and time is HH:mm
      startTime = new Date(`${date.trim()}T${time.trim()}:00`).toISOString();
    } catch (e) {
      Alert.alert('Invalid Format', 'Please use YYYY-MM-DD for date and HH:mm for time (e.g. 2024-05-20 and 17:00)');
      return;
    }

    // Extract meeting code if a full URL was provided
    let extractedCode = meetingCode.trim();
    if (extractedCode.includes('meet.google.com/')) {
      extractedCode = extractedCode.split('meet.google.com/').pop().split('?')[0];
    }

    setProcessing(true);
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `${API_URL}/${selectedMeetingId}` : API_URL;

    try {
      const fullLink = extractedCode ? (extractedCode.startsWith('http') ? extractedCode : `https://meet.google.com/${extractedCode}`) : '';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: (description || '').trim(),
          meetingCode: (extractedCode || '').trim(),
          link: fullLink, // API requires 'link' field
          location: 'Google Meet', 
          startTime: startTime,
          status: 'scheduled'
        }),
      });

      if (response.status === 401) {
        await logout();
        navigation.replace('Login');
        return;
      }

      if (response.ok) {
        Alert.alert('Success', `Meeting ${isEditMode ? 'updated' : 'scheduled'}`);
        closeModal();
        fetchMeetings();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save meeting');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while connecting to the server');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteMeeting = (id) => {
    Alert.alert(
      'Delete Meeting',
      'Are you sure you want to remove this meeting?',
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
              if (response.ok) fetchMeetings();
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
    const now = new Date();
    setFormData({
      title: '',
      date: now.toISOString().split('T')[0],
      time: '17:00',
      meetingCode: '',
      description: '',
    });
    setIsModalVisible(true);
  };

  const openEditModal = (meeting) => {
    setIsEditMode(true);
    setSelectedMeetingId(meeting.id || meeting._id);
    
    // Split ISO startTime back into date and time
    let date = '';
    let time = '';
    if (meeting.startTime) {
      const d = new Date(meeting.startTime);
      date = d.toISOString().split('T')[0];
      time = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }

    setFormData({
      title: meeting.title,
      date: date,
      time: time,
      meetingCode: meeting.meetingCode || '',
      description: meeting.description || '',
    });
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const filteredMeetings = meetings.filter(m => 
    m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Text style={styles.title}>Meetings</Text>
          <Text style={styles.subtitle}>Manage meetings and track attendance</Text>
          
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Meeting</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.searchBar}>
            <Search size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search meetings..." 
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.listContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0F172A" style={{ marginVertical: 40 }} />
            ) : filteredMeetings.length > 0 ? (
              filteredMeetings.map(meeting => (
                <MeetingCard 
                  key={meeting.id || meeting._id} 
                  meeting={meeting} 
                  onEdit={openEditModal}
                  onDelete={handleDeleteMeeting}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <CalendarIcon size={40} color="#E2E8F0" />
                <Text style={styles.emptyText}>
                  {searchQuery ? 'No results found' : 'No meetings yet'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <AddMeetingModal 
        visible={isModalVisible}
        onClose={closeModal}
        isEditMode={isEditMode}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveMeeting}
        processing={processing}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF', // Light blue background base
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
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MeetingsScreen;



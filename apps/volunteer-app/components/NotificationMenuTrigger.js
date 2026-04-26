import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Menu, MenuTrigger, MenuOptions } from 'react-native-popup-menu';
import { Bell } from 'lucide-react-native';
import styles from '../styles/homeStyles';

export default function NotificationMenuTrigger({ 
  hasNewNotifications, 
  onMenuOpened,
  notifications = [
    { id: 1, text: "Event on DD/MM/YY\nLocation X", isNew: true },
    { id: 2, text: "Meeting today at X time\nProject Team", isNew: false },
    { id: 3, text: "Meeting in X days\nWhole branch", isNew: false }
  ]
}) {
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const notificationMenuRef = useRef(null);

  const toggleNotificationMenu = () => {
    if (notificationMenuOpen) {
      notificationMenuRef.current?.close();
    } else {
      notificationMenuRef.current?.open();
    }
    setNotificationMenuOpen(!notificationMenuOpen);
  };

  return (
    <Menu
      ref={notificationMenuRef}
      onOpen={() => {
        setNotificationMenuOpen(true);
        if (onMenuOpened) onMenuOpened();
      }}
      onClose={() => setNotificationMenuOpen(false)}
    >
      <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }} onPress={toggleNotificationMenu}>
        <View style={{ position: 'relative', marginRight: 20 }}>
          <Image
            source={
              notificationMenuOpen
                ? require('../assets/close.png')
                : require('../assets/notification.png')
            }
            style={[styles.icon, { marginRight: 0 }]}
          />
          {hasNewNotifications && !notificationMenuOpen && (
            <View style={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 10,
              height: 10,
              backgroundColor: '#FF8C00', // darker orange matching better with blue/red
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'white'
            }} />
          )}
        </View>
      </MenuTrigger>

      <MenuOptions customStyles={{ 
        optionsContainer: [
          styles.popupContainer, 
          { 
            right: 60, 
            width: 220, 
            minHeight: 180, 
            backgroundColor: '#EEEEEE',
            padding: 0,
            paddingBottom: 15
          }
        ] 
      }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, paddingBottom: 10 }}>
          <Bell color="#000" size={18} strokeWidth={1.5} />
          <Text style={{ marginLeft: 30, fontSize: 13, color: '#000' }}>Notifications</Text>
        </View>

        {/* Content */}
        {notifications && notifications.length > 0 ? (
          <View style={{ paddingHorizontal: 15 }}>
            {notifications.map((notif) => (
              <TouchableOpacity key={notif.id} style={{
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 10,
                marginBottom: 10,
                position: 'relative',
                backgroundColor: 'transparent' // as per the screenshot
              }}>
                <Text style={{ textAlign: 'center', fontSize: 11, color: '#000' }}>{notif.text}</Text>
                {notif.isNew && (
                  <View style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 10,
                    height: 10,
                    backgroundColor: '#FFB800', // orange dot for unread status
                    borderRadius: 5,
                  }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#333' }}>Nothing to see here...</Text>
          </View>
        )}
        
        {/* Pagination Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'white', marginHorizontal: 4 }} />
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#A0A0A0', marginHorizontal: 4 }} />
        </View>

      </MenuOptions>
    </Menu>
  );
}

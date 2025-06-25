import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import PlaceholderImage from '../components/PlaceholderImage';

// Define notification type
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  color: string;
  icon: string;
  isNew?: boolean;
  movieId?: string;
}

// Sample notification data
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Release',
    message: 'Watch "The Batman" now streaming!',
    time: '2 hours ago',
    color: '#2F4F4F',
    icon: '🎬',
    isNew: true,
    movieId: '1'
  },
  {
    id: '2',
    title: 'Recommended for you',
    message: 'Based on your interests: "Tenet"',
    time: '5 hours ago',
    color: '#000080',
    icon: '👍',
    isNew: true,
    movieId: '2'
  },
  {
    id: '3',
    title: 'Continue Watching',
    message: 'You left "Dune" at 45 minutes',
    time: '1 day ago',
    color: '#8B4513',
    icon: '▶️',
    movieId: '3'
  },
  {
    id: '4',
    title: 'New Season',
    message: 'Stranger Things Season 4 is now available',
    time: '2 days ago',
    color: '#5D3FD3',
    icon: '📺'
  },
  {
    id: '5',
    title: 'Subscription',
    message: 'Your subscription will renew in 3 days',
    time: '3 days ago',
    color: '#ff3b30',
    icon: '💳'
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Handler to go back safely
  const handleGoBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.error('Navigation error:', error);
      // If goBack fails, try navigate to Main
      try {
        // @ts-ignore
        navigation.navigate('Main');
      } catch (navError) {
        console.error('Fallback navigation error:', navError);
      }
    }
  };

  // Handler for notification item press
  const handleNotificationPress = (notification: Notification) => {
    try {
      // If the notification has a movieId, navigate to the movie detail
      if (notification.movieId) {
        // @ts-ignore
        navigation.navigate('Detail', { id: notification.movieId });
      } else if (notification.title === 'Subscription') {
        // @ts-ignore
        navigation.navigate('Subscription');
      } else {
        // Just mark as read by removing isNew flag
        setNotifications(prevNotifications => 
          prevNotifications.map(n => 
            n.id === notification.id ? {...n, isNew: false} : n
          )
        );
      }
    } catch (error) {
      console.error('Error handling notification press:', error);
    }
  };

  // Handler to clear all notifications
  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {item.isNew && <View style={styles.newIndicator} />}
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <PlaceholderImage
            width={24}
            height={24}
            text="←"
            backgroundColor="transparent"
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.subHeader}>
        <Text style={styles.todayText}>Today</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <PlaceholderImage
            width={80}
            height={80}
            text="🔔"
            backgroundColor="transparent"
            color="#8E8E93"
          />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282833',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#282833',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  todayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  clearAllText: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#282833',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  newIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
  },
  time: {
    color: '#8E8E93',
    fontSize: 12,
  },
  message: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    marginTop: 16,
  },
});

export default NotificationScreen; 
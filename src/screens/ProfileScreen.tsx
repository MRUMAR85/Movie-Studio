import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import PlaceholderImage from '../components/PlaceholderImage';
import LogoutPopup from '../components/LogoutPopup';
import FirebaseService from '../utils/FirebaseService';

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [userName] = useState('Smith');
  const [userEmail] = useState('smith@example.com');

  // Handle logout action
  const handleLogOut = async () => {
    try {
      await FirebaseService.signOut();
      // @ts-ignore
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to login even if there's an error with the signout
      // @ts-ignore
      navigation.navigate('Login');
    } finally {
      setLogoutVisible(false);
    }
  };

  // Show logout confirmation popup
  const showLogoutPopup = () => {
    setLogoutVisible(true);
  };

  // Navigate safely to a screen
  const navigateTo = (screenName: string) => {
    try {
      // @ts-ignore - Navigation types are strict but this works
      navigation.navigate(screenName);
    } catch (error) {
      console.error(`Navigation error to ${screenName}:`, error);
      Alert.alert('Navigation Error', `Could not navigate to ${screenName} screen`);
    }
  };

  // Handle unimplemented features
  const handleUnimplementedFeature = (featureName: string) => {
    Alert.alert(
      'Feature Coming Soon',
      `The ${featureName} feature is not yet implemented and will be available in a future update.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.userInfo}>
            <PlaceholderImage 
              width={80}
              height={80}
              text={userName ? userName.charAt(0) : "S"}
              backgroundColor="#646cff"
              style={{ borderRadius: 40 }}
            />
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigateTo('EditProfile')}
          >
            <PlaceholderImage 
              width={24}
              height={24}
              text="✏️"
              backgroundColor="transparent"
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleUnimplementedFeature('Change Password')}
            >
              <View style={styles.menuIconContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text="🔒"
                  backgroundColor="transparent"
                  color="white"
                />
              </View>
              <Text style={styles.menuText}>Change Password</Text>
              <View style={styles.chevronContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text=">"
                  backgroundColor="transparent"
                  color="#8E8E93"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* General Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateTo('Notification')}
            >
              <View style={styles.menuIconContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text="🔔"
                  backgroundColor="transparent"
                  color="white"
                />
              </View>
              <Text style={styles.menuText}>Notification</Text>
              <View style={styles.chevronContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text=">"
                  backgroundColor="transparent"
                  color="#8E8E93"
                />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateTo('Language')}
            >
              <View style={styles.menuIconContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text="🌐"
                  backgroundColor="transparent"
                  color="white"
                />
              </View>
              <Text style={styles.menuText}>Language</Text>
              <View style={styles.chevronContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text=">"
                  backgroundColor="transparent"
                  color="#8E8E93"
                />
              </View>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleUnimplementedFeature('Help Center')}
            >
              <View style={styles.menuIconContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text="❓"
                  backgroundColor="transparent"
                  color="white"
                />
              </View>
              <Text style={styles.menuText}>Help Center</Text>
              <View style={styles.chevronContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text=">"
                  backgroundColor="transparent"
                  color="#8E8E93"
                />
              </View>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleUnimplementedFeature('Rate Us')}
            >
              <View style={styles.menuIconContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text="⭐"
                  backgroundColor="transparent"
                  color="white"
                />
              </View>
              <Text style={styles.menuText}>Rate Us</Text>
              <View style={styles.chevronContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text=">"
                  backgroundColor="transparent"
                  color="#8E8E93"
                />
              </View>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateTo('Subscription')}
            >
              <View style={styles.menuIconContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text="💲"
                  backgroundColor="transparent"
                  color="white"
                />
              </View>
              <Text style={styles.menuText}>Subscription</Text>
              <View style={styles.chevronContainer}>
                <PlaceholderImage 
                  width={24}
                  height={24}
                  text=">"
                  backgroundColor="transparent"
                  color="#8E8E93"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={showLogoutPopup}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Popup */}
      <LogoutPopup 
        visible={logoutVisible} 
        onClose={() => setLogoutVisible(false)} 
        onLogout={handleLogOut} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomColor: '#282833',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomColor: '#282833',
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameContainer: {
    marginLeft: 16,
  },
  userName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#8E8E93',
    fontSize: 14,
  },
  editButton: {
    width: 44,
    height: 44,
    backgroundColor: '#282833',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#282833',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  chevronContainer: {
    width: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#383843',
    marginLeft: 76,
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 40,
    marginHorizontal: 16,
    height: 56,
    backgroundColor: '#ff3b30',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen; 
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlaceholderImage from '../components/PlaceholderImage';
import DiscoverScreen from '../screens/DiscoverScreen';

// Fallback screen component
const FallbackScreen = ({ screenName }: { screenName: string }) => {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        Could not load the {screenName} screen.
      </Text>
    </View>
  );
};

// Screen wrappers with error handling
const SafeHomeScreen = (props: any) => {
  try {
    return <HomeScreen {...props} />;
  } catch (error) {
    console.error("Error rendering HomeScreen:", error);
    return <FallbackScreen screenName="Home" />;
  }
};

const SafeDiscoverScreen = (props: any) => {
  try {
    return <DiscoverScreen {...props} />;
  } catch (error) {
    console.error("Error rendering DiscoverScreen:", error);
    return <FallbackScreen screenName="Discover" />;
  }
};

const SafeProfileScreen = (props: any) => {
  try {
    return <ProfileScreen {...props} />;
  } catch (error) {
    console.error("Error rendering ProfileScreen:", error);
    return <FallbackScreen screenName="Profile" />;
  }
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  // Render tab icon function
  const renderTabIcon = (text: string, color: string) => {
    try {
      return (
        <View style={styles.tabIconContainer}>
          <PlaceholderImage 
            width={24}
            height={24}
            text={text}
            backgroundColor="transparent"
            color={color}
          />
        </View>
      );
    } catch (error) {
      console.error("Error rendering tab icon:", error);
      // Return a simple colored square as fallback
      return (
        <View style={[styles.fallbackIcon, { backgroundColor: color }]} />
      );
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ff3b30',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={SafeHomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => renderTabIcon("🏠", color),
        }}
      />
      <Tab.Screen 
        name="DiscoverTab" 
        component={SafeDiscoverScreen}
        options={{
          tabBarIcon: ({ focused, color }) => renderTabIcon("🔍", color),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={SafeProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => renderTabIcon("👤", color),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#171720',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  fallbackContainer: {
    flex: 1, 
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  fallbackIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  }
});

export default TabNavigator; 
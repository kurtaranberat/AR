import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogBox } from 'react-native';
import GameScreen from './components/GameScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import NotificationsScreen from './components/NotificationsScreen';

// Three.js ve Bridgeless uyarılarını devre dışı bırak
LogBox.ignoreLogs([
  'THREE.WebGLRenderer',
  'Bridgeless',
  'ViewPropTypes will be removed from React Native',
  'RCTBridge required dispatch_sync to load',
]);

// Global olarak window.performance tanımla
if (typeof global.window === 'undefined') {
  global.window = global;
}

if (typeof global.window.performance === 'undefined') {
  global.window.performance = {
    now: () => Date.now(),
  };
}

// Global olarak TextEncoder tanımla
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('text-encoding').TextEncoder;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Game1':
                iconName = 'cube-outline';
                break;
              case 'Game2':
                iconName = 'butterfly';
                break;
              case 'Game3':
                iconName = 'book-open-variant';
                break;
              case 'Game4':
                iconName = 'checkbox-marked-circle-outline';
                break;
              default:
                iconName = 'gamepad-variant';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4ECDC4',
          tabBarInactiveTintColor: '#95A5A6',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 10,
            height: 60,
            paddingBottom: 10,
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
          },
          headerTitleStyle: {
            color: '#333333',
            fontSize: 18,
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Game1"
          component={GameScreen}
          options={{
            tabBarLabel: '3D Şekiller',
            headerTitle: '3D Şekil Oyunu',
          }}
        />
        <Tab.Screen 
          name="Game2"
          component={ProfileScreen}
          options={{
            tabBarLabel: '3D Kelebek',
            headerTitle: '3D Simetri Oyunu',
          }}
        />
        <Tab.Screen 
          name="Game3"
          component={SettingsScreen}
          options={{
            tabBarLabel: '3D Metin',
            headerTitle: '3D Okuma Oyunu',
          }}
        />
        <Tab.Screen 
          name="Game4"
          component={NotificationsScreen}
          options={{
            tabBarLabel: '3D Görevler',
            headerTitle: '3D Görev Dünyası',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

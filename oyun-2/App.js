import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GameScreen from './components/GameScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import NotificationsScreen from './components/NotificationsScreen';

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
                iconName = 'shape-outline';
                break;
              case 'Game2':
                iconName = 'pencil-ruler';
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
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: '#666666',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
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
            tabBarLabel: 'Oyun 1',
            headerTitle: 'Şekil Oyunu',
          }}
        />
        <Tab.Screen 
          name="Game2"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Oyun 2',
            headerTitle: 'Simetri Oyunu',
          }}
        />
        <Tab.Screen 
          name="Game3"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Oyun 3',
            headerTitle: 'Okuma Oyunu',
          }}
        />
        <Tab.Screen 
          name="Game4"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Oyun 4',
            headerTitle: 'Görev Oyunu',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

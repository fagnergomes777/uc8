import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./(tabs)/HomeScreen";
import SettingsScreen from "./(tabs)/SettingsScreen";
import NearbyGymsScreen from "./(tabs)/NearbyGymsScreen";
import { lightTheme, darkTheme } from '../styles/themes'

const Tab = createBottomTabNavigator();


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
  
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Configurações') iconName = 'settings';
            else if (route.name === 'Academias Próximas') iconName = 'map';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: theme.tabBar },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: theme.tabBar },
          headerTintColor: theme.text,
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="Academias Próximas">
          {() => <NearbyGymsScreen theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="Configurações">
          {() => (
            <SettingsScreen
              theme={theme}
              toggleTheme={toggleTheme}
              isDarkMode={isDarkMode}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
   
  );
}

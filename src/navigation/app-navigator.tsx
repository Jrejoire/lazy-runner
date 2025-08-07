import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import { HomeScreen } from '../screens/home-screen';
import { MobilityScreen } from '../screens/mobility-screen';
import { StrengtheningScreen } from '../screens/strengthening-screen';
import { SessionScreen } from '../screens/session-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: Platform.OS === 'android' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'android' ? 80 : 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: Platform.OS === 'android' ? 8 : 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen
        name="Mobility"
        component={MobilityScreen}
        options={{
          title: 'Mobilité',
          tabBarLabel: 'Mobilité',
        }}
      />
      <Tab.Screen
        name="Strengthening"
        component={StrengtheningScreen}
        options={{
          title: 'Renforcement',
          tabBarLabel: 'Renforcement',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="Session"
          component={SessionScreen}
          options={{
            headerShown: true,
            title: 'Séance en cours',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './home-screen';
import MobilityScreen from './mobility-screen';
import StrengtheningScreen from './strengthening-screen';
import SessionScreen from './session-screen';
import { RootStackParamList, SCREENS } from '../constantes/page.constance';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
          hidden={true}
        />
        <Stack.Navigator
          initialRouteName={SCREENS.HOME}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
          <Stack.Screen name={SCREENS.MOBILITY} component={MobilityScreen} />
          <Stack.Screen
            name={SCREENS.STRENGTHENING}
            component={StrengtheningScreen}
          />
          <Stack.Screen name={SCREENS.SESSION} component={SessionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

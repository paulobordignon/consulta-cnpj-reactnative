import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Main from './pages/Main';
import ReadQRCode from './pages/ReadQRCode';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F2F3F5' }
        }}>

        <Screen
          name="Main"
          component={Main}
        //options={{headerShown: false}}
        />

        <Screen
          name="ReadQRCode"
          component={ReadQRCode}
        />
      </Navigator>
    </NavigationContainer>
  );
}
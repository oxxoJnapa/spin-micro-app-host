import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './screens/auth';
import {HostNavigatorParamsList} from './HostNavigationParamsList';
import CreditsNavigation from './screens/credits';

const HostNavigator = createNativeStackNavigator<HostNavigatorParamsList>();

export default function HostNavigation() {
  return (
    <HostNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
      <HostNavigator.Screen name="Auth" component={AuthNavigation} />
      <HostNavigator.Screen name="Credits" component={CreditsNavigation} />
    </HostNavigator.Navigator>
  );
}

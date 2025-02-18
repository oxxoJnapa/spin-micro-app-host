/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HostDrawer from './src/HostDrawer';

type MainNavigationParamsList = {
  HostDrawer: undefined;
};

const MainNavigation = createNativeStackNavigator<MainNavigationParamsList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <MainNavigation.Navigator screenOptions={{ headerShown: false }}>
          <MainNavigation.Screen name="HostDrawer" component={HostDrawer} />
        </MainNavigation.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import Home from '../Home';
import MicroApp1Screen from '../MicroApp1';

type DrawerNavigationParamsList = {
  Home: undefined;
  MicroApp1: undefined;
};

const DrawerNavigation = createDrawerNavigator<DrawerNavigationParamsList>();

export default function HostDrawer() {
  return (
    <DrawerNavigation.Navigator>
      <DrawerNavigation.Screen name="Home" component={Home} />
      <DrawerNavigation.Screen name="MicroApp1" component={MicroApp1Screen} />
    </DrawerNavigation.Navigator>
  );
}

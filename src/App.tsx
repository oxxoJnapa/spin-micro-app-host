/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { ThemeProvider } from '@digitaltitransversal/tr_superapp_theme';

import HostNavigation from './HostNavigation';
// import LoadMicroApp from './components/LoadMicroApp';

// const LazyLocalComponent = React.lazy(() => import('./components/LazyLocalComponent'));
// const LazyRemoteComponent = React.lazy(() => import(/!* webpackChunkName: "LazyRemoteComponent.remote" *!/ './components/LazyRemoteComponent'));

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <ThemeProvider theme={require('../assets/theme/theme-spin-by-oxxo.json')}>
          <HostNavigation />
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

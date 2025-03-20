import React, {useCallback, useEffect, useState} from 'react';
import LoadMicroApp from '../../components/LoadMicroApp';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthNavigator = React.lazy(() => import('app1/AuthNavigator'));

export default function AuthNavigation() {
  const [AuthNavigator, setAuthNavigator] = useState<React.LazyExoticComponent<typeof React.Component>>();
  const loadModule = useCallback(async () => {
    await AsyncStorage.removeItem('app1/AuthNavigator');
    const ComponentCached = await AsyncStorage.getItem('app1/AuthNavigator');
    if (ComponentCached) {
      console.log("ComponentCached", ComponentCached);
      setAuthNavigator((JSON.parse(ComponentCached)));
    } else {
      const Component = React.lazy(() => import('app1/AuthNavigator'));
      await AsyncStorage.setItem('app1/AuthNavigator', JSON.stringify(Component));
      setAuthNavigator(Component);
    }
  }, []);
  useEffect(() => {
    loadModule().catch(null);
  }, [loadModule]);
  return (
    <LoadMicroApp appName="Login Module">
      {AuthNavigator ? (
        <AuthNavigator />
      ) : undefined}
    </LoadMicroApp>
  );
}

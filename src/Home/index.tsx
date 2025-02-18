import React from 'react';
import {Text} from 'react-native';

const Home = React.lazy(() => import('./Home'));

export default function HomeScreen() {
  return (
    <React.Suspense fallback={<Text>Loading Home...</Text>}>
      <Home />
    </React.Suspense>
  );
}

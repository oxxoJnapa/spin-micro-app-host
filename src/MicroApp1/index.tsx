import React from 'react';
import {Federated} from '@callstack/repack/client';
import {Text} from 'react-native';

const MicroApp1 = React.lazy(() => Federated.importModule('app1', './App'));

export default function MicroApp1Screen() {
  return (
    <React.Suspense fallback={<Text>Loading Micro App 1 ...</Text>}>
      <MicroApp1 />
    </React.Suspense>
  );
}

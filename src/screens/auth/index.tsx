import React from 'react';
import {Federated} from '@callstack/repack/client';
import LoadMicroApp from '../../components/LoadMicroApp';

const AuthNavigator = React.lazy(() => Federated.importModule('app1', './AuthNavigator'));

export default function AuthNavigation() {
  return (
    <LoadMicroApp appName="Login Module">
      <AuthNavigator />
    </LoadMicroApp>
  );
}

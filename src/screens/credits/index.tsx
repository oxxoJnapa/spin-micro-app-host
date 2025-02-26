import React from 'react';
import LoadMicroApp from '../../components/LoadMicroApp';
import {Federated} from '@callstack/repack/client';

const CreditsNavigator = React.lazy(() => Federated.importModule('app2', './CreditsNavigator'));

export default function CreditsNavigation() {
  return (
    <LoadMicroApp appName="Credits Module">
      <CreditsNavigator />
    </LoadMicroApp>
  );
}

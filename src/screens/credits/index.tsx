import React from 'react';
import LoadMicroApp from '../../components/LoadMicroApp';

const CreditsNavigator = React.lazy(() => import('app2/CreditsNavigator'));

export default function CreditsNavigation() {
  return (
    <LoadMicroApp appName="Credits Module">
      <CreditsNavigator />
    </LoadMicroApp>
  );
}

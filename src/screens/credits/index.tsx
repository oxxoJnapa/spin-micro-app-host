import React from 'react';
import LoadMicroApp from '../../components/LoadMicroApp';
import safeImport from '../../utils/safe-import';

const CreditsNavigator = React.lazy(() => safeImport('app2/CreditsNavigator', 'Credits Module'));

export default function CreditsNavigation() {
  return (
    <LoadMicroApp appName="Credits Module">
      <CreditsNavigator />
    </LoadMicroApp>
  );
}

import React from 'react';
import LoadMicroApp from '../../components/LoadMicroApp';
import safeImport from '../../utils/safe-import';

const AuthNavigator = React.lazy(() => safeImport('app1/AuthNavigator', 'Login Module'));

export default function AuthNavigation() {
  return (
    <LoadMicroApp appName="Login Module">
      <AuthNavigator />
    </LoadMicroApp>
  );
}

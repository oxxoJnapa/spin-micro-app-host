import React from 'react';
import LoadMicroApp from '../../components/LoadMicroApp';

const AuthNavigator = React.lazy(() => import('app1/AuthNavigator'));

export default function AuthNavigation() {
  return (
    <LoadMicroApp appName="Login Module">
      <AuthNavigator />
    </LoadMicroApp>
  );
}

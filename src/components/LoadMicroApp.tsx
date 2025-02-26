import React, {Suspense} from 'react';
import {View} from 'react-native';
import {ActivityLoader, Text, useTheme} from '@digitaltitransversal/tr_superapp_theme';
import ModuleNotAvailable from './ModuleNotAvailable';
import ErrorBoundary from './ErrorBoundary';

function Loader({ appName }: { appName: string }) {
  const { space } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityLoader color="brand" testID="" />
      <Text variant="headline-medium" style={{ marginTop: space.space_md }}>
        Cargando {appName}
      </Text>
    </View>
  );
}

export default function LoadMicroApp({ appName, children }: React.PropsWithChildren<{ appName: string }>) {
  return (
    <ErrorBoundary fallback={<ModuleNotAvailable moduleName={appName} />}>
      <Suspense fallback={<Loader appName={appName} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

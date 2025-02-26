import React from 'react';
import { Text } from '@digitaltitransversal/tr_superapp_theme';
import {SafeAreaView, ScrollView, View} from 'react-native';

type ModuleNotAvailableProps = {
  moduleName: string;
};

export default function ModuleNotAvailable({ moduleName }: ModuleNotAvailableProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="headline-large" style={{ textAlign: 'center' }}>
            Ocurrió un error cargando el modulo {moduleName}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

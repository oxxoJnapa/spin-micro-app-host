import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {Text} from '@digitaltitransversal/tr_superapp_theme';

export default function LazyRemoteComponent() {
  return (
    <SafeAreaView>
      <View>
        <Text>Lazy Remote Component</Text>
      </View>
    </SafeAreaView>
  );
}

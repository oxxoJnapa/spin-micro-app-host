import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {Text} from '@digitaltitransversal/tr_superapp_theme';

export default function LazyLocalComponent() {
  return (
    <SafeAreaView>
      <View>
        <Text>Lazy Local Component</Text>
      </View>
    </SafeAreaView>
  );
}

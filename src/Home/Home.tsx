import {ScrollView, Text, View} from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Host App Home</Text>
      </View>
   </ScrollView>
  );
}

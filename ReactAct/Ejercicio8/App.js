import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Icono de React Native:</Text>
      <Ionicons name="logo-react" size={64} color="blue" />
    </View>
  );
}
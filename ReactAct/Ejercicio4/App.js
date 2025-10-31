import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:30 }}>{contador}</Text>
      <Button title="➕" onPress={() => setContador(contador+1)} />
      <Button title="➖" onPress={() => setContador(contador-1)} />
    </View>
  );
}
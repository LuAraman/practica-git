import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState("");

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <TextInput 
        placeholder="Escribe tu nombre" 
        style={{ borderWidth:1, padding:8, marginBottom:10, width:200 }}
        onChangeText={setNombre}
      />
      <Text>Hola {nombre}</Text>
    </View>
  );
}
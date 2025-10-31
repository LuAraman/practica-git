import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);

  const sumar = () => {
    setResultado(parseInt(num1) + parseInt(num2));
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <TextInput placeholder="Número 1" keyboardType="numeric" style={{ borderWidth:1, padding:8, margin:5, width:200 }} onChangeText={setNum1}/>
      <TextInput placeholder="Número 2" keyboardType="numeric" style={{ borderWidth:1, padding:8, margin:5, width:200 }} onChangeText={setNum2}/>
      <Button title="Sumar" onPress={sumar} />
      {resultado !== null && <Text style={{ marginTop:10 }}>Resultado: {resultado}</Text>}
    </View>
  );
}
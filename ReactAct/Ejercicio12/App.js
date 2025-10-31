import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState("");
  const [resultado, setResultado] = useState("");

  const verificar = () => {
    const n = parseInt(numero);
    if (isNaN(n)) {
      setResultado("Ingresa un número válido");
    } else {
      setResultado(n % 2 === 0 ? "Es par" : "Es impar");
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <TextInput placeholder="Escribe un número" keyboardType="numeric" style={{ borderWidth:1, padding:8, margin:5, width:200 }} onChangeText={setNumero}/>
      <Button title="Verificar" onPress={verificar} />
      <Text style={{ marginTop:10 }}>{resultado}</Text>
    </View>
  );
}
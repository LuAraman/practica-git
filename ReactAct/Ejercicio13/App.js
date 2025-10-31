import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = (op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) {
      setResultado("Error: Ingresa números válidos");
      return;
    }
    if (op === "sumar") setResultado(n1 + n2);
    if (op === "restar") setResultado(n1 - n2);
    if (op === "multiplicar") setResultado(n1 * n2);
    if (op === "dividir") setResultado(n2 !== 0 ? n1 / n2 : "No se puede dividir entre 0");
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <TextInput placeholder="Número 1" keyboardType="numeric" style={{ borderWidth:1, padding:8, margin:5, width:200 }} onChangeText={setNum1}/>
      <TextInput placeholder="Número 2" keyboardType="numeric" style={{ borderWidth:1, padding:8, margin:5, width:200 }} onChangeText={setNum2}/>
      
      <View style={{ flexDirection:'row', marginTop:10 }}>
        <Button title="➕" onPress={() => calcular("sumar")} />
        <Button title="➖" onPress={() => calcular("restar")} />
        <Button title="✖" onPress={() => calcular("multiplicar")} />
        <Button title="➗" onPress={() => calcular("dividir")} />
      </View>

      {resultado !== null && <Text style={{ marginTop:10 }}>Resultado: {resultado}</Text>}
    </View>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState('');
  const [secuencia, setSecuencia] = useState([]);

  const generarSecuencia = () => {
    const N = parseInt(numero);
    
    if (isNaN(N) || N < 2) {
      setSecuencia(["Introduce un número entero > 1"]);
      return;
    }
    const lista = [];
    for (let i = 1; i < N; i++) {
      lista.push(i);
    }
    
    setSecuencia(lista);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        placeholder="Número límite"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, width: 200 }}
        onChangeText={setNumero}
        value={numero}
      />
      
      <Button title="Mostrar Anteriores" onPress={generarSecuencia} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Elementos antes:</Text>
      
      {}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {secuencia.map((item, index) => (
          <Text key={index} style={{ margin: 5, padding: 5, backgroundColor: '#f0f0f0' }}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}
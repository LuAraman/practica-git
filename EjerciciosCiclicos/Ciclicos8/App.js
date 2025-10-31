import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState('');
  const [tabla, setTabla] = useState([]);

  const generarTabla = () => {
    const N = parseInt(numero);

    if (isNaN(N) || N < 1) {
      setTabla(["Introduce un número válido."]);
      return;
    }

    const results = [];
    
    // 🔄 Estructura Cíclica (Bucle for: del 1 al 10)
    for (let i = 1; i <= 10; i++) {
      results.push(`${N} x ${i} = ${N * i}`);
    }
    
    setTabla(results);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Número para la tabla"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15 }}
        onChangeText={setNumero}
        value={numero}
      />
      
      <Button title="Generar Tabla" onPress={generarTabla} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Resultado:</Text>
      
      {/* 🔄 Bucle de Renderizado (.map) */}
      <View style={{ marginTop: 5 }}>
        {tabla.map((line, index) => (
          <Text key={index} style={{ fontSize: 16 }}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [nota, setNota] = useState("");
  const [mensaje, setMensaje] = useState("Ingresa nota (0-10)");

  const verificarNota = () => {
    const n = parseFloat(nota);

    if (isNaN(n) || n < 0 || n > 10) {
      setMensaje(`${nota} no válido. Ingresa nota entre 0-10`);
    } else {
      // La calificación es válida, el "ciclo" termina.
      setMensaje(`Nota aceptada (${n})`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 15, fontWeight: 'bold' }}>{mensaje}</Text>
      
      <TextInput
        placeholder="Calificación"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 10 }}
        onChangeText={setNota}
        value={nota}
      />
      
      <Button title="Validar" onPress={verificarNota} />
    </View>
  );
}
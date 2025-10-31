import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function EncontrarMenorMinimalista() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(''); 

  const encontrarMenor = () => {
    const N1 = parseFloat(num1);
    const N2 = parseFloat(num2);

    if (isNaN(N1) || isNaN(N2)) {
      setResultado("Error: Ingresa dos números válidos.");
      return;
    }

    let mensaje;
    
    if (N1 === N2) {
      mensaje = `Ambos son iguales: ${N1}`;
    } else {
      const menor = N1 < N2 ? N1 : N2; 
      mensaje = `El menor es: ${menor}`;
    }

    setResultado(mensaje);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        placeholder="Número 1"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 150, marginBottom: 10, textAlign: 'center' }}
        onChangeText={setNum1}
        value={num1}
      />
      
      <TextInput
        placeholder="Número 2"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 150, marginBottom: 15, textAlign: 'center' }}
        onChangeText={setNum2}
        value={num2}
      />
      
      <Button title="Ver Menor" onPress={encontrarMenor} />

      <Text style={{ marginTop: 25, fontSize: 20, fontWeight: 'bold' }}>
        {resultado}
      </Text>
    </View>
  );
}
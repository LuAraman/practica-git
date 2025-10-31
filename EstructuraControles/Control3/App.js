import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function EncontrarMayor() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(null);

  const encontrarMayor = () => {
    const N1 = parseInt(num1);
    const N2 = parseInt(num2);

    if (isNaN(N1) || isNaN(N2)) {
      setResultado("Por favor, ingresa dos números enteros válidos.");
      return;
    }
    let mayor;
    
    if (N1 > N2) {
      mayor = N1;
    } else if (N2 > N1) {
      mayor = N2;
    } else {
      mayor = "Ambos números son iguales.";
    }
    // ------------------------------------

    setResultado(mayor);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Encontrar el Mayor de Dos
      </Text>
      
      <TextInput
        placeholder="Primer número entero"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 10 }}
        onChangeText={setNum1}
        value={num1}
      />
      
      <TextInput
        placeholder="Segundo número entero"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15 }}
        onChangeText={setNum2}
        value={num2}
      />
      
      <Button title="Comparar" onPress={encontrarMayor} />

      {resultado !== null && (
        <Text style={{ marginTop: 25, fontSize: 24, fontWeight: 'bold' }}>
          {typeof resultado === 'number' ? `El mayor es: ${resultado}` : resultado}
        </Text>
      )}
    </View>
  );
}
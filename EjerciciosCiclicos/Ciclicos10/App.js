import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function SumaCuadrados() {
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    let suma = 0;
    const LIMITE = 100;

    for (let i = 1; i <= LIMITE; i++) {
      suma += (i * i);
    }
    
    setResultado(suma);
  }, []); 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: 'bold' }}>
        Suma de los Cuadrados (1 a 100)
      </Text>
      
      <Text style={{ fontSize: 30, color: '#00796b' }}>
        {resultado}
      </Text>
      
      <Text style={{ marginTop: 10, color: '#666' }}>
        (1² + 2² + 3² + ... + 100²)
      </Text>
    </View>
  );
}
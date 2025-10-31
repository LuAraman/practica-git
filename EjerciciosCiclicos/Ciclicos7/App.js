import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const getTensSequence = () => {
    const sequence = [];
    
    for (let i = 0; i <= 100; i += 10) {
      sequence.push(i);
    }
    return sequence;
  };

  const numeros = getTensSequence();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Secuencia de 0 a 100:
      </Text>
      
      {}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {numeros.map((number, index) => (
          <Text key={index} style={{ fontSize: 20, margin: 5, padding: 8, backgroundColor: '#e0f7fa' }}>
            {number}
          </Text>
        ))}
      </View>
    </View>
  );
}

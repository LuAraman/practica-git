import React from 'react';
import { View, Text } from 'react-native';
export default function App() {
  const getEvenNumbers = () => {
    const evenNumbers = [];
    
    for (let i = 2; i <= 15; i++) {
      if (i % 2 === 0) {
        evenNumbers.push(i);
      }
    }

    return evenNumbers;

  };


  const pares = getEvenNumbers();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Números Pares [2 - 15]:
      </Text>
      
      {}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pares.map((number, index) => (
          <Text key={index} style={{ fontSize: 20, margin: 5, padding: 8, backgroundColor: '#e0f7fa' }}>
            {number}
          </Text>
        ))}
      </View>
    </View>


  );
  
}
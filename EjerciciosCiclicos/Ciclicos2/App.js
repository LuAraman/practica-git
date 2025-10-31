import React from 'react';
import { View, Text } from 'react-native';
export default function App() {
  const renderSequence = () => {
    let output = [];
    
    for (let i = 1; i <= 30; i++) {
      let content = i.toString();
      
      if (i % 7 === 0) {
        content += '\n'; 
      }
      output.push(
        <Text key={i} style={{ marginHorizontal: 5, fontSize: 18 }}>
          {content}
        </Text>
      );
    }
    return output;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 15, fontWeight: 'bold' }}>Secuencia 1-30 (Salto cada 7):</Text>
      {}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%' }}>
        {renderSequence()}
      </View>
    </View>
  );

}
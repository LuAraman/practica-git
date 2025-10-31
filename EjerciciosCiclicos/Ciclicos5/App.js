import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
export default function App() {
  const MAX_GRADES = 10;
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0); 
  const [statusMessage, setStatusMessage] = useState('Ingresa la nota 1 de 10 (Rango: 6-10)'); 

  const validateAndCount = () => {
    const grade = parseFloat(input);

    if (count >= MAX_GRADES) {
      setStatusMessage("✅ ¡10 calificaciones completadas!");
      return;
    }



    if (isNaN(grade) || grade < 6 || grade > 10) {
      setStatusMessage(`Error: ${input} no es válida. Debe ser 6-10.`);
    } else {
      const nextCount = count + 1;
      setCount(nextCount);
      setStatusMessage(`Nota ${nextCount} aceptada. Ingresa la nota ${nextCount + 1} de ${MAX_GRADES}.`);
    }
    
    setInput(''); 
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 15, fontWeight: 'bold' }}>
        {count < MAX_GRADES ? statusMessage : "Proceso Terminado"}
      </Text>
      
      <TextInput
        placeholder="Nota (6-10)"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 10 }}
        onChangeText={setInput}
        value={input}
        editable={count < MAX_GRADES}
      />
      
      <Button 
        title={`Aceptar Nota (${count} / ${MAX_GRADES})`} 
        onPress={validateAndCount} 
        disabled={count >= MAX_GRADES}
      />
    </View>
  );

  
}
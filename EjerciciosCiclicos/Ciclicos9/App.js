import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [continuar, setContinuar] = useState(true);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('¿Desea continuar S/N?');

  const verificarRespuesta = () => {
    const input = respuesta.toUpperCase().trim(); 

    if (input === 'N') {
      setContinuar(false);
      setMensaje('FIN');
    } else if (input === 'S') {
      setMensaje('Continuando. ¿Desea continuar S/N?');
    } else {
      setMensaje('Respuesta inválida. ¿Desea continuar S/N?');
    }
    
    setRespuesta(''); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{mensaje}</Text>
      
      {}
      {continuar ? (
        <View>
          <TextInput
            placeholder="S o N"
            style={{ borderWidth: 1, padding: 8, width: 100, marginBottom: 10, textAlign: 'center' }}
            onChangeText={setRespuesta}
            value={respuesta}
            maxLength={1}
          />
          <Button title="Enviar" onPress={verificarRespuesta} />
        </View>
      ) : (
        <Text style={{ fontSize: 20, color: 'red', marginTop: 20 }}>FIN</Text>
      )}
    </View>
  );
}

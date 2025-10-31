import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function EncontrarMaximoMasBasico() {
  const [maximo, setMaximo] = useState(null);
  const [numerosSimulados, setNumerosSimulados] = useState([]);
  
  const NUMEROS = [25, 12, 47, 8, 33]; 
  const LIMITE = 5;

  const encontrarMaximo = () => {
    setNumerosSimulados(NUMEROS);
    
    let maximoEncontrado = null;
    
    for (let i = 0; i < LIMITE; i++) {
      const numeroActual = NUMEROS[i];
      
      if (maximoEncontrado === null || numeroActual > maximoEncontrado) {
        maximoEncontrado = numeroActual;
      }
    }
    
    setMaximo(maximoEncontrado);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15 }}>
        Encontrar el máximo de 5 números:
      </Text>
      
      <Text style={{ marginBottom: 15 }}>
        Números: [{numerosSimulados.join(', ')}]
      </Text>
      
      <Button 
        title="Ejecutar Programa" 
        onPress={encontrarMaximo}
      />

      {maximo !== null && (
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Resultado:</Text>
          <Text style={{ fontSize: 40, color: '#ff6f00', fontWeight: 'bold' }}>
            {maximo}
          </Text>
        </View>
      )}
    </View>
  );
}
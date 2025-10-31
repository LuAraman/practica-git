import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CalculadoraBates() {
  const [cantidad, setCantidad] = useState('');
  const [costoTotal, setCostoTotal] = useState(null);

  const PRECIO_NORMAL = 250; 
  const PRECIO_DESCUENTO = 230; 
  const LIMITE_NORMAL = 10;

  const calcularCosto = () => {
    const cant = parseInt(cantidad);

    if (isNaN(cant) || cant <= 0) {
      alert("Por favor, ingresa una cantidad válida de bates.");
      setCostoTotal(null);
      return;
    }

    let total;
    let costoBase;
    
    if (cant <= LIMITE_NORMAL) {
      total = cant * PRECIO_NORMAL;
      
    } else {
      costoBase = LIMITE_NORMAL * PRECIO_NORMAL; 
            const restantes = cant - LIMITE_NORMAL;
            const costoRestante = restantes * PRECIO_DESCUENTO;
      total = costoBase + costoRestante;
    }

    setCostoTotal(total);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Calculadora de Costo de Bates
      </Text>
      
      <TextInput
        placeholder="Número de bates comprados"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15 }}
        onChangeText={setCantidad}
        value={cantidad}
      />
      
      <Button title="Calcular Costo" onPress={calcularCosto} />

      {costoTotal !== null && (
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 5 }}>
            Bates Comprados: **{cantidad}**
          </Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#00796b' }}>
            Costo Total: **${costoTotal.toFixed(2)}**
          </Text>
        </View>
      )}
    </View>


  );


  
}
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CalculadoraLapices() {
  const [cantidad, setCantidad] = useState('');
  const [costoTotal, setCostoTotal] = useState(null);
  const [precioUnitario, setPrecioUnitario] = useState(null);

  const PRECIO_1 = 0.80; 
  const PRECIO_2 = 1.20; 
  const PRECIO_3 = 1.50; 
  const PRECIO_4 = 2.10; 

  const calcularCosto = () => {
    const cant = parseInt(cantidad);
    if (isNaN(cant) || cant <= 0) {
      alert("Por favor, ingresa una cantidad válida de lápices.");
      setPrecioUnitario(null);
      setCostoTotal(null);
      return;
    }

    let precio;
    if (cant >= 100) {
      precio = PRECIO_1; 
    } else if (cant > 50) {
      precio = PRECIO_2; 
    } else if (cant >= 30) {
      precio = PRECIO_3; 
    } else {
      precio = PRECIO_4; 
    }
    const total = cant * precio;
    setPrecioUnitario(precio);
    setCostoTotal(total);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Calculadora de Costo de Lápices
      </Text>
      
      <TextInput
        placeholder="Cantidad de lápices"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15 }}
        onChangeText={setCantidad}
        value={cantidad}
      />
      
      <Button title="Calcular Costo" onPress={calcularCosto} />

      {costoTotal !== null && (
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Precio Unitario: **${precioUnitario.toFixed(2)}**
          </Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#00796b' }}>
            Costo Total: **${costoTotal.toFixed(2)}**
          </Text>
        </View>
      )}

    </View>


  );


}
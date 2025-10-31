import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CalculadoraBates() {
  const [cantidad, setCantidad] = useState('');
  const [costoTotal, setCostoTotal] = useState(null);
  const [precioUnitario, setPrecioUnitario] = useState(null);

  // Precios fijos
  const PRECIO_MAYOR = 100; // Si se compran 10 o más
  const PRECIO_MENOR = 108; // Si se compran menos de 10

  const calcularCosto = () => {
    const cant = parseInt(cantidad);

    if (isNaN(cant) || cant <= 0) {
      alert("Por favor, ingresa una cantidad válida de bates.");
      setPrecioUnitario(null);
      setCostoTotal(null);
      return;
    }

    let precio;
    
    // 🧐 ESTRUCTURA CONDICIONAL (Decisión del Precio)
    if (cant >= 10) {
      // Caso 1: Se compran 10 o más
      precio = PRECIO_MAYOR;
    } else {
      // Caso 2: Se compran menos de 10
      precio = PRECIO_MENOR;
    }
    // ------------------------------------

    const total = cant * precio;
    setPrecioUnitario(precio);
    setCostoTotal(total);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Calculadora de Costo de Bates
      </Text>
      
      <TextInput
        placeholder="Cantidad de bates"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15 }}
        onChangeText={setCantidad}
        value={cantidad}
      />
      
      <Button title="Calcular Costo" onPress={calcularCosto} />

      {/* Salida del programa */}
      {costoTotal !== null && (
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 5 }}>
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

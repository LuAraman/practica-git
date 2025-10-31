import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CalculadoraSalarioSemanal() {
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [salarioNeto, setSalarioNeto] = useState(null);
  const [detalle, setDetalle] = useState('');

  const LIMITE_NORMAL = 40;  
  const TARIFA_NORMAL = 50; 
  const TARIFA_EXTRA = 70;   
  const calcularSalario = () => {
    const H = parseFloat(horasTrabajadas);

    if (isNaN(H) || H < 0) {
      alert("Por favor, ingresa una cantidad de horas válida y positiva.");
      setSalarioNeto(null);
      setDetalle('');
      return;
    }

    let salario;
    
    if (H <= LIMITE_NORMAL) {
      salario = H * TARIFA_NORMAL;
      setDetalle(`Trabajó ${H} horas normales.`);
      
    } else {
      const pagoNormal = LIMITE_NORMAL * TARIFA_NORMAL; 
      
      const horasExtra = H - LIMITE_NORMAL;
      const pagoExtra = horasExtra * TARIFA_EXTRA;
      
      salario = pagoNormal + pagoExtra;
      setDetalle(`Trabajó ${LIMITE_NORMAL} 
        hrs normales ($${pagoNormal.toFixed(2)}) y ${horasExtra} 
        hrs extra ($${pagoExtra.toFixed(2)}).`);
    }

    setSalarioNeto(salario);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Calcular Salario Semanal
      </Text>
      
      <TextInput
        placeholder="Total de horas trabajadas"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15, textAlign: 'center' }}
        onChangeText={setHorasTrabajadas}
        value={horasTrabajadas}
      />
      
      <Button title="Calcular Pago" onPress={calcularSalario} />

      {salarioNeto !== null && (
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Text style={{ marginBottom: 5, textAlign: 'center' }}>
            {detalle}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#3f51b5' }}>
            Salario Total: **${salarioNeto.toFixed(2)}**
          </Text>
        </View>

      )}
    </View>


  );

}
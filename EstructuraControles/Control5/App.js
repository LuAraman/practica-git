import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
export default function CalculadoraSalarioBasica() {
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [salarioNeto, setSalarioNeto] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const HORAS_NORMALES = 40;
  const TARIFA_NORMAL = 14.00;
  const TARIFA_EXTRA = 26.00;

  const calcularSalario = () => {
    const H = parseFloat(horasTrabajadas);
w
    if (isNaN(H) || H < 0) {
      setMensaje("Ingresa horas válidas.");
      setSalarioNeto(null);
      return;
    }

    let salario;
    
    if (H <= HORAS_NORMALES) {
      salario = H * TARIFA_NORMAL;
      setMensaje(`Horas normales trabajadas (${H} hrs).`);
      
    } else {
      const pagoNormal = HORAS_NORMALES * TARIFA_NORMAL;
      const horasExtra = H - HORAS_NORMALES;
      const pagoExtra = horasExtra * TARIFA_EXTRA;
      
      salario = pagoNormal + pagoExtra;
      setMensaje(`Trabajó ${HORAS_NORMALES} hrs normales y ${horasExtra} hrs extra.`);
    
    }

    setSalarioNeto(salario);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
        Calcular Pago por Horas
      </Text>
      
      <TextInput
        placeholder="Total de horas trabajadas"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 15, textAlign: 'center' }}
        onChangeText={setHorasTrabajadas}
        value={horasTrabajadas}
      />
      
      <Button title="Calcular Salario" onPress={calcularSalario} />



      {salarioNeto !== null && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ marginBottom: 5 }}>{mensaje}</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#00796b' }}>
            TOTAL: ${salarioNeto.toFixed(2)}
          </Text>
        </View>


      )}
    </View>


  );

}
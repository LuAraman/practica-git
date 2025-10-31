import React from 'react';
import { View, Text } from 'react-native';

export default function CalculadoraSalarioBasica() {
  const HORAS_DIARIAS = 8;
  const DIAS_QUINCENA = 15;
  const PAGO_POR_HORA = 50; 
  const COMPENSACION = 0.02; 
  const DESC_IMSS = 0.015;  
  const DESC_ISPT = 0.012;  
  const horasTotales = HORAS_DIARIAS * DIAS_QUINCENA; 
  const salarioBruto = horasTotales * PAGO_POR_HORA;  
  const valorCompensacion = salarioBruto * COMPENSACION; 
  const valorIMSS = salarioBruto * DESC_IMSS;            
  const valorISPT = salarioBruto * DESC_ISPT;           
  const totalDescuentos = valorIMSS + valorISPT;         
  const salarioNeto = salarioBruto + valorCompensacion - totalDescuentos; 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: 'bold' }}>
        Salario Neto Quincenal
      </Text>
      
      <Text>Salario Bruto: ${salarioBruto.toFixed(2)}</Text>
      <Text style={{ marginVertical: 5 }}>+ Compensación (2%): ${valorCompensacion.toFixed(2)}</Text>
      <Text>- Descuento IMSS (1.5%): ${valorIMSS.toFixed(2)}</Text>
      <Text>- Descuento ISPT (1.2%): ${valorISPT.toFixed(2)}</Text>
      
      <Text style={{ marginTop: 20, fontSize: 24, color: '#00796b', fontWeight: 'bold' }}>
        NETO: ${salarioNeto.toFixed(2)}
      </Text>
    </View>
  );
}
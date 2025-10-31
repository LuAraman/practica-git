import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [reporte, setReporte] = useState([]);
  
  const simularCaptura = () => {
    const data = [];
    const NUM_ALUMNOS = 5;
    const NUM_NOTAS = 3;
    
    // 🔄 Bucle Externo (Alumnos: 1 a 5)
    for (let i = 1; i <= NUM_ALUMNOS; i++) {
      let notasAlumno = [];
      
      // 🔄 Bucle Interno (Calificaciones: 1 a 3)
      for (let j = 1; j <= NUM_NOTAS; j++) {
        // Simulación: Genera una nota aleatoria entre 5 y 10.
        const nota = (Math.random() * 5 + 5).toFixed(1); 
        notasAlumno.push(parseFloat(nota));
      }
      
      // Almacena el resultado de la lectura del alumno
      data.push({
        id: i,
        notas: notasAlumno.join(', ')
      });
    }
    
    setReporte(data);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Button title="Simular Lectura de 5 Alumnos (3 Notas c/u)" onPress={simularCaptura} />
      
      <Text style={{ marginTop: 20, fontWeight: 'bold', marginBottom: 10 }}>Reporte de Captura:</Text>
      
      {/* 🔄 Bucle de Renderizado (.map) */}
      {reporte.map((alumno, index) => (
        <Text key={index} style={{ marginBottom: 5, fontSize: 16 }}>
          **Alumno {alumno.id}**: Notas: ({alumno.notas})
        </Text>
      ))}
      
      {reporte.length === 0 && <Text style={{ color: '#666' }}>Presiona el botón para generar el reporte.</Text>}
    </View>
  );
}
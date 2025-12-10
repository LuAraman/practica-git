import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AguaContext } from '../context/AguaContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

export default function Inicio() {
  const { aguaConsumida, retosCompletados, retosDisponibles } = useContext(AguaContext);

  const mensajes = [
    'Recuerda: cada acción suma información 💧',
    'Tu consumo refleja tus hábitos 🌎',
    '¡Analiza y mejora tu impacto diario 🌱!',
    'El agua es valiosa, mide tu uso',
    'Tus registros ayudan a crear conciencia'
  ];
  const [mensajeMotivacional, setMensajeMotivacional] = useState('');

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * mensajes.length);
    setMensajeMotivacional(mensajes[aleatorio]);
  }, [retosCompletados]);

  const progreso = retosCompletados / retosDisponibles;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Consumo diario</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Consumo de Agua realizado:</Text>
          <Text style={styles.valor}>{aguaConsumida} L</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Retos Registrados:</Text>
          <Text style={styles.valor}>{retosCompletados}/{retosDisponibles}</Text>
          <Progress.Bar 
            progress={progreso} 
            width={null} 
            height={15} 
            color="#3498DB" 
            borderRadius={10} 
          />
          <Text style={styles.porcentaje}>{Math.round(progreso * 100)}% completado</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Mensaje para ti:</Text>
          <Text style={styles.mensaje}>{mensajeMotivacional}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAF2F8' },
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 10, color: '#2E86C1', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
  label: { fontSize: 18, fontWeight: '600', color: '#34495E' },
  valor: { fontSize: 22, fontWeight: 'bold', color: '#3498DB', marginVertical: 5 },
  porcentaje: { fontSize: 14, color: '#5D6D7E', marginTop: 5, textAlign: 'center' },
  mensaje: { fontSize: 16, fontStyle: 'italic', color: '#5D6D7E', marginTop: 10 },
});

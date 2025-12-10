import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { AguaContext } from '../context/AguaContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Retos() {
  const { registrarConsumo, retosCompletados } = useContext(AguaContext);
  const [valores, setValores] = useState({});
  const [completadosIds, setCompletadosIds] = useState([]);

  const retos = [
    { id: '1', titulo: 'Ducha rápida', descripcion: 'Ingresa el tiempo de tu ducha (minutos)', factor: 10 },
    { id: '2', titulo: 'Cierra el grifo', descripcion: 'Ingresa los minutos que normalmente dejarías correr el agua', factor: 12 },
    { id: '3', titulo: 'Lava platos', descripcion: 'Ingresa el tiempo que tardaste en lavar los platos (minutos)', factor: 10 },
    { id: '4', titulo: 'Lava con cubeta', descripcion: 'Ingresa número de cubetas usadas (10L cada una)', factor: 10 },
    { id: '5', titulo: 'Taza de baño', descripcion: 'Ingresa cuántas veces accionaste la palanca del inodoro', factor: 10 },
  ];

  const registrarReto = (item) => {
    if (!valores[item.id]) {
      Alert.alert('Dato requerido', 'Por favor ingresa un valor numérico.');
      return;
    }
    if (completadosIds.includes(item.id)) {
      Alert.alert('Ya completado', 'Este reto ya fue realizado hoy.');
      return;
    }

    const cantidad = parseInt(valores[item.id]);
    const litrosConsumidos = cantidad * item.factor;

    registrarConsumo(litrosConsumidos);
    setCompletadosIds([...completadosIds, item.id]);
    Alert.alert('Reto registrado', `Has registrado un consumo aproximado de ${litrosConsumidos} L`);
  };

  const renderReto = ({ item }) => {
    const yaCompletado = completadosIds.includes(item.id);

    return (
      <View style={[styles.card, yaCompletado && styles.cardCompletado]}>
        <Text style={styles.tituloReto}>{item.titulo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ingresa un número"
          value={valores[item.id] || ''}
          onChangeText={(text) => setValores({ ...valores, [item.id]: text })}
          editable={!yaCompletado}
        />
        <Button
          title={yaCompletado ? 'Completado' : 'Registrar reto'}
          onPress={() => registrarReto(item)}
          disabled={yaCompletado}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Retos diarios</Text>
        <Text style={styles.subtitulo}>Completados: {retosCompletados}/5</Text>

        <FlatList
          data={retos}
          keyExtractor={(item) => item.id}
          renderItem={renderReto}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAF2F8' },
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, marginTop: 10, color: '#2E86C1', textAlign: 'center' },
  subtitulo: { fontSize: 16, marginBottom: 10, color: '#34495E', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  cardCompletado: { backgroundColor: '#D5F5E3' },
  tituloReto: { fontSize: 18, fontWeight: 'bold', color: '#1ABC9C' },
  descripcion: { fontSize: 14, marginVertical: 5, color: '#566573' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 10, borderRadius: 5 },
});

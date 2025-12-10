import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Perfil({ navigation, route }) {
  const user = route?.params?.user;

  function cerrarSesion() {
    navigation.replace("Login"); 
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Perfil de usuario</Text>

        {/* Foto de perfil */}
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png' }} 
          style={styles.avatar} 
        />

        {/* Recuadro con datos */}
        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.valor}>{user?.nombre || "Sin registrar"}</Text>

          <Text style={styles.label}>Correo</Text>
          <Text style={styles.valor}>{user?.correo || "Sin registrar"}</Text>
        </View>

        {/* Botón de editar perfil */}
        <TouchableOpacity 
          style={styles.botonEditar} 
          onPress={() => alert('Función en desarrollo')}
        >
          <Text style={styles.botonTexto}>EDITAR PERFIL</Text>
        </TouchableOpacity>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity 
          style={styles.botonCerrar} 
          onPress={cerrarSesion}
        >
          <Text style={styles.botonTexto}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAF2F8' },
  container: { flex: 1, alignItems: 'center', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#2E86C1', marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 25, backgroundColor: '#D5DBDB' },
  card: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontSize: 16, color: '#566573', marginBottom: 5 },
  valor: { fontSize: 18, fontWeight: 'bold', color: '#2E86C1', marginBottom: 15 },
  botonEditar: {
    backgroundColor: '#2E86C1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  botonCerrar: {
    backgroundColor: '#C0392B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

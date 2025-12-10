import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Configuracion() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header centrado */}
        <Text style={styles.header}>Configuración</Text>

        {/* Notificaciones */}
        <TouchableOpacity style={styles.item} onPress={() => alert('Preferencias de alerta en desarrollo')}>
          <View style={styles.iconText}>
            <Ionicons name="notifications-outline" size={24} color="#2E86C1" />
            <View style={styles.textGroup}>
              <Text style={styles.title}>Notificaciones</Text>
              <Text style={styles.subtitle}>Ajustar preferencias de alerta</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#566573" />
        </TouchableOpacity>

        {/* Ayuda y Soporte */}
        <TouchableOpacity style={styles.item} onPress={() => alert('Ayuda y soporte en desarrollo')}>
          <View style={styles.iconText}>
            <Ionicons name="help-circle-outline" size={24} color="#2E86C1" />
            <Text style={styles.title}>Ayuda y Soporte</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#566573" />
        </TouchableOpacity>

        {/* Política de Privacidad */}
        <TouchableOpacity style={styles.item} onPress={() => alert('Política de privacidad en desarrollo')}>
          <View style={styles.iconText}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#2E86C1" />
            <Text style={styles.title}>Política de Privacidad</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#566573" />
        </TouchableOpacity>

        {/* Términos de Servicio */}
        <TouchableOpacity style={styles.item} onPress={() => alert('Términos de servicio en desarrollo')}>
          <View style={styles.iconText}>
            <Ionicons name="document-text-outline" size={24} color="#2E86C1" />
            <Text style={styles.title}>Términos de Servicio</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#566573" />
        </TouchableOpacity>

        {/* Versión de la App */}
        <View style={[styles.item, styles.versionItem]}>
          <View style={styles.iconText}>
            <Ionicons name="information-circle-outline" size={24} color="#2E86C1" />
            <View style={styles.textGroup}>
              <Text style={styles.title}>Versión de la App</Text>
              <Text style={styles.subtitle}>v1.0.0</Text>
            </View>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F7' },
  container: { flex: 1, padding: 20 },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#2E86C1', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  item: {
    backgroundColor: '#EAF2F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  versionItem: {
    marginTop: 30,
    borderTopWidth: 0.5,
    borderTopColor: '#D5DBDB',
  },
  iconText: { flexDirection: 'row', alignItems: 'center' },
  textGroup: { marginLeft: 10 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2E86C1' },
  subtitle: { fontSize: 14, color: '#566573', marginTop: 2 },
});

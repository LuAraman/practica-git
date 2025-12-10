import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { register } from "../services/api";

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleRegister() {
    try {
      const data = await register(nombre, correo, contraseña);
      setMensaje(data.message);

      if (data.success) {
        navigation.replace("Login");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor");
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear cuenta</Text>
      <Text style={styles.subHeader}>Regístrate para comenzar</Text>

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.boton} onPress={handleRegister}>
        <Text style={styles.botonTexto}>REGISTRARME</Text>
      </TouchableOpacity>

      {mensaje !== "" && <Text style={styles.mensaje}>{mensaje}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EAF2F8", padding: 20 },
  header: { fontSize: 28, fontWeight: "bold", color: "#2E86C1", marginBottom: 10 },
  subHeader: { fontSize: 16, color: "#566573", marginBottom: 30 },
  input: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D5DBDB",
  },
  boton: { backgroundColor: "#27AE60", paddingVertical: 14, width: "90%", borderRadius: 8, marginBottom: 15 },
  botonTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "600", textAlign: "center" },
  mensaje: { color: "#C0392B", marginTop: 10 },
  link: { color: "#2E86C1", marginTop: 20, fontWeight: "bold" },
});

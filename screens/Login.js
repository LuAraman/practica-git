import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleLogin() {
    try {
      const res = await fetch("http://192.168.31.155:7882/Tutorial/login.php", { //es mi ip personal, por que lo ejecuto en el telefono
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });
      const data = await res.json();

      if (data.success) {
        navigation.replace("MainTabs", { user: data.user }); 
      } else {
        setMensaje(data.message || "Error de autenticación");
      }
    } catch (err) {
      setMensaje("Error de conexión con el servidor");
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido</Text>
      <Text style={styles.subHeader}>Inicia sesión para continuar</Text>

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

      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.botonTexto}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      {mensaje !== "" && <Text style={styles.mensaje}>{mensaje}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
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
  boton: { backgroundColor: "#2E86C1", paddingVertical: 14, width: "90%", borderRadius: 8, marginBottom: 15 },
  botonTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "600", textAlign: "center" },
  mensaje: { color: "#C0392B", marginTop: 10 },
  link: { color: "#2E86C1", marginTop: 20, fontWeight: "bold" },
});

<?php
include 'conexion.php'; // Usa la conexión sin imprimir nada

// Leer el cuerpo JSON
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Validar que se recibió JSON
if (!is_array($data)) {
  echo json_encode(["success" => false, "message" => "Formato JSON inválido"]);
  exit;
}

$correo = trim($data['correo'] ?? '');
$contraseña = $data['contraseña'] ?? '';

// Validar campos
if ($correo === '' || $contraseña === '') {
  echo json_encode(["success" => false, "message" => "Correo y contraseña son obligatorios"]);
  exit;
}

// Buscar usuario por correo
$sql = "SELECT id, nombre, correo, password_hash FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
  exit;
}

$usuario = $result->fetch_assoc();

// Verificar contraseña
if (password_verify($contraseña, $usuario['password_hash'])) {
  unset($usuario['password_hash']); // No enviar el hash al frontend
  echo json_encode([
    "success" => true,
    "message" => "Login exitoso",
    "user" => $usuario
  ]);
} else {
  echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
}

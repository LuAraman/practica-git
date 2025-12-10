<?php
include 'conexion.php';

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
  echo json_encode(["success" => false, "message" => "Formato JSON inválido"]);
  exit;
}

$nombre = trim($data['nombre'] ?? '');
$correo = trim($data['correo'] ?? '');
$contraseña = $data['contraseña'] ?? '';

if ($nombre === '' || $correo === '' || $contraseña === '') {
  echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios"]);
  exit;
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["success" => false, "message" => "Correo inválido"]);
  exit;
}
if (strlen($contraseña) < 8) {
  echo json_encode(["success" => false, "message" => "La contraseña debe tener al menos 8 caracteres"]);
  exit;
}

$sqlCheck = "SELECT id FROM usuarios WHERE correo = ?";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("s", $correo);
$stmtCheck->execute();
$resCheck = $stmtCheck->get_result();
if ($resCheck && $resCheck->num_rows > 0) {
  echo json_encode(["success" => false, "message" => "El correo ya está registrado"]);
  exit;
}

$hash = password_hash($contraseña, PASSWORD_DEFAULT);
$sqlInsert = "INSERT INTO usuarios (nombre, correo, password_hash) VALUES (?, ?, ?)";
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("sss", $nombre, $correo, $hash);

if ($stmtInsert->execute()) {
  echo json_encode(["success" => true, "message" => "Registro exitoso"]);
} else {
  echo json_encode(["success" => false, "message" => "Error al registrar"]);
}

<?php
// Cabeceras para respuesta JSON
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// Parámetros de conexión
$server = "localhost";
$username = "root";
$password = "12345678";
$database = "agua_app";
$port = 3307;

// Crear conexión
$conn = new mysqli($server, $username, $password, $database, $port);

// Verificar conexión
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => "❌ Error de conexión: " . $conn->connect_error
  ]);
  exit;
}

// Configurar charset
$conn->set_charset("utf8");

// ⚠️ No pongas ningún echo aquí. Este archivo solo prepara la conexión.

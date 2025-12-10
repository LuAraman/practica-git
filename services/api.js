const BASE_URL = "http://192.168.31.155:7882/Tutorial"; 

export async function register(nombre, correo, contraseña) {
  const res = await fetch(`${BASE_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, contraseña })
  });
  return res.json();
}

export async function login(correo, contraseña) {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contraseña })
  });
  return res.json();
}

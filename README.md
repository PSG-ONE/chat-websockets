Aquí lo tienes listo para copiar/pegar en tu repo:

# 📡 P2P Chat – WebSocket Demo

Un chat en tiempo real simple construido con **Node.js, Express y WebSocket**.  
El objetivo principal es demostrar la comunicación bidireccional entre cliente y servidor, ideal como proyecto de práctica o portafolio.

---

## 🚀 Características

- Chat en tiempo real con WebSockets.  
- Interfaz web sencilla con login de prueba (usuario fijo).  
- Compatible con despliegue en **Render** o en un servidor local.  
- Opción de ejecución con **Docker**.  

---

## 🛠️ Tecnologías utilizadas

- **Node.js**  
- **Express**  
- **WebSocket (ws)**  
- **HTML / CSS / JS**  

---

## 📂 Estructura del proyecto



p2p-chat/
│── client.html # Interfaz del chat con login
│── client.js # Lógica cliente
│── server.js # Servidor Express + WebSocket
│── package.json # Dependencias


---

## ⚙️ Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/p2p-chat.git
   cd p2p-chat


Instalar dependencias:

npm install


Ejecutar el servidor:

node server.js


Abrir en navegador:

http://localhost:3000/client.html

🐳 Ejecución con Docker
docker build -t p2p-chat .
docker run -p 3000:3000 p2p-chat


Abrir en navegador:
👉 http://localhost:3000/client.html

🌍 Despliegue en Render

Este proyecto fue desplegado en Render como Web Service.

🔗 Demo activa: P2P Chat en Render

⚠️ Nota: Render apaga el servicio después de inactividad, por lo que la primera carga puede demorar unos segundos.

Credenciales de prueba:

Usuario: admin

Contraseña: 1234

📖 Uso

Iniciar sesión con las credenciales de prueba.

Escribir un mensaje en el input.

Ver cómo se transmite en tiempo real a todos los clientes conectados.

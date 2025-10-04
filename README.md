![Demo del Chat](./screenshot.png)


# 💬 P2P Chat – WebSocket Demo

Un chat en tiempo real simple construido con **Node.js, Express y WebSocket**.  
El objetivo principal es demostrar la comunicación bidireccional entre cliente y servidor, ideal como proyecto de práctica o portafolio.

---

## ✨ Características

- Chat en tiempo real con WebSockets.
- Interfaz web sencilla con login de prueba (usuario fijo).
- Compatible con despliegue en **Render** o en un servidor local.
- Opción de ejecución con **Docker**.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- WebSocket (ws)
- HTML / CSS / JS

---
## 📂 Estructura del proyecto

```bash
p2p-chat/
├── client.html   # Interfaz del chat con login
├── client.js     # Lógica cliente
├── server.js     # Servidor Express + WebSocket
├── package.json  # Dependencias
└── package-lock.json
```
## ⚙️ Instalación local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/p2p-chat.git
cd p2p-chat
```
2. Instalar dependencias
```bash
npm install
```
3. Ejecutar el servidor
```bash
node server.js
```
Abrir en navegador:
```bash
http://localhost:3000/client.html
```
(Estre link solo funciona en tu maquina despues de iniciar el servidor)

🐳 Ejecución con Docker
1. Construir la imagen
```bash
docker build -t p2p-chat
```
2. Ejecutar el contenedor
```bash
docker run -p 3000:3000 p2p-chat
```
3. Abrir en navegador
```bash
http://localhost:3000/client.html
```
🌐 Despliegue en Render

Este proyecto fue desplegado en Render como Web Service.
```bash
https://p2p-chat-tdde.onrender.com/client.html
```
⚠️ Nota: Render apaga el servicio después de un tiempo de inactividad, por lo que la primera carga puede tardar unos segundos.

Credenciales de prueba:

Usuario: admin

Contraseña: 1234

📜 Licencia

Este proyecto está bajo la licencia MIT.
Puedes usarlo, copiarlo o modificarlo libremente con fines educativos o profesionales.
```
https://github.com/PSG-ONE/p2p-chat/blob/main/LICENSE
```

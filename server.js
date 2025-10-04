const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// 1. Servir client.html en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client.html"));
});

// 2. Crear servidor HTTP con Express
const server = http.createServer(app);

// 3. Crear servidor WebSocket sobre el mismo HTTP
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (msg) => {
    console.log("Mensaje recibido:", msg.toString());
    // reenviar a todos
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// 4. Escuchar en Render
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

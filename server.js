const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// ✅ Esto es lo que Render usa para servir tu client.html
app.use(express.static(path.join(__dirname)));

// WebSocket sobre el servidor HTTP
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");
  ws.on("message", (msg) => {
    console.log("Mensaje recibido:", msg.toString());
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

// Escuchar en Render
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

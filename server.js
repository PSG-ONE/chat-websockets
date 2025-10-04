const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// 👉 Aquí servimos el client.html cuando abran la raíz "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client.html"));
});

// Creamos servidor HTTP
const server = http.createServer(app);

// WebSocket sobre el mismo servidor HTTP
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

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

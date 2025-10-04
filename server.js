const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

// servir el archivo client.html
app.use(express.static(path.join(__dirname)));

// crear servidor http + websocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (msg) => {
    console.log("Mensaje recibido:", msg.toString());

    // reenviar mensaje a todos los clientes
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

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

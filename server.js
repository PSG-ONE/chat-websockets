const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// Servir archivos estáticos (por si tienes CSS/JS en la misma carpeta)
app.use(express.static(__dirname));

// 👉 Servir client.html en la raíz "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client.html"));
});

// Crear servidor HTTP con Express
const server = http.createServer(app);

// Crear servidor WebSocket sobre el mismo HTTP
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (msg) => {
    console.log("Mensaje recibido:", msg.toString());
    // reenviar mensaje a todos los clientes conectados
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

// Escuchar en el puerto asignado por Render
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

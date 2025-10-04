const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

// 1. Creamos un servidor HTTP que responda en la raíz
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor P2P Chat funcionando 🚀');
});

// 2. Creamos el servidor WebSocket sobre el servidor HTTP
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  ws.on('message', (msg) => {
    console.log('Mensaje recibido:', msg.toString());
    // reenviar mensaje a todos los clientes
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// 3. Escuchar en el puerto que Render te asigna
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

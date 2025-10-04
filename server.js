// server.js
const WebSocket = require('ws');
const { v4: uuid } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });
const rooms = new Map();

function joinRoom(roomId, ws) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
}

function leaveRoom(ws) {
  if (!ws.roomId || !rooms.has(ws.roomId)) return;
  const set = rooms.get(ws.roomId);
  set.delete(ws);
  if (set.size === 0) rooms.delete(ws.roomId);
}

wss.on('connection', (ws) => {
  ws.id = uuid();

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type === 'join') {
        joinRoom(msg.room, ws);
        ws.send(JSON.stringify({ type: 'joined', room: msg.room }));
      } else if (msg.type === 'signal') {
        const peers = rooms.get(ws.roomId) || new Set();
        for (const peer of peers) {
          if (peer !== ws && peer.readyState === WebSocket.OPEN) {
            peer.send(JSON.stringify({ type: 'signal', from: ws.id, data: msg.data }));
          }
        }
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });

  ws.on('close', () => leaveRoom(ws));
});

console.log('Servidor relay corriendo en ws://localhost:8080');

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ user: data.user, msg: data.msg }));
        }
      });
    } catch (err) {
      console.error("Error procesando mensaje:", err);
    }
  });

  ws.on("close", () => console.log("Cliente desconectado"));
});


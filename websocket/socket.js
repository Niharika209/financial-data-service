const { Server } = require('socket.io');

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Simulate sending a random stock price every 10 minutes
    const sendRandomData = () => {
      const stockUpdate = {
        symbol: 'RELIANCE',
        price: parseFloat((Math.random() * 1000 + 100).toFixed(2)),
        timestamp: new Date().toISOString()
      };
      socket.emit('priceUpdate', stockUpdate);
    };

    const intervalId = setInterval(sendRandomData, 600000); // 10 min

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      clearInterval(intervalId);
    });
  });
}

module.exports = { setupWebSocket };
// This code sets up a WebSocket server using Socket.IO to send random stock price updates every 10 seconds.
// The WebSocket server listens for client connections and emits a 'priceUpdate' event with a random stock price.
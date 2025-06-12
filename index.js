const express = require('express');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket/socket');

const app = express();
const server = http.createServer(app); // for WebSocket support

setupWebSocket(server); // initialize WebSocket server

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Financial Data Service API');
});

// Routes
app.use('/api/v1/indexes', require('./routes/indexes'));
app.use('/api/v1/stock/history', require('./routes/history'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

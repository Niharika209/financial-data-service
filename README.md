# Financial Data Service

A backend prototype for simulating a financial data service. Built with Node.js, Express, and Socket.IO, it provides REST APIs for stock indexes and historical data, and simulates live price updates via WebSockets.

## Features

- REST API endpoints for stock market indexes and historical data
- Real-time price updates via WebSocket
- Simulated data generation for testing

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/Niharika209/financial-data-service
cd financial-data-service
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```
> By default, the server runs on `http://localhost:5000`

## API Documentation

### Get Market Indexes
Returns a list of all available stock symbols.

```bash
GET /api/v1/indexes

# CURL Example
curl "http://localhost:5000/api/v1/indexes"

Response:
{
  "symbols": ["TATASTEEL", "RELIANCE", ...]
}
```

### Get Historical Data
Fetches historical price data for a specific stock.

```bash
GET /api/v1/stock/history

Query Parameters:
- symbol: Stock symbol (e.g., TATASTEEL)
- startDate: Start date (YYYY-MM-DD)
- endDate: End date (YYYY-MM-DD)
- interval: Time interval (5min, 15min, 1hour, 1day)

# CURL Example
curl "http://localhost:5000/api/v1/stock/history?symbol=TATASTEEL&startDate=2025-06-01&endDate=2025-06-11&interval=5min"

Response:
[
  {
    "symbol": "TATASTEEL",
    "price": 542.75,
    "timestamp": "2025-06-01T09:30:00Z",
    "interval": "5min"
  },
  ...
]
```

## WebSocket Integration

Connect to receive live stock price updates every 10 minutes.

```javascript
const socket = io("ws://localhost:5000");

socket.on("priceUpdate", (data) => {
  console.log(data);
  // { symbol: "RELIANCE", price: 2150.25, timestamp: "2023-06-11T10:00:00Z" }
});
```
## Additional Feature

### Web interface to test the WebSocket
While not part of the original requirements, this project includes an `index.html` file that provides a simple web interface for visualizing real-time WebSocket updates. This makes it easier to test and demonstrate the WebSocket functionality.
To test it:

1. Open index.html in a browser and make sure the server is running to see live price updates
2. Updates are simulated every 10 minutes
3. Price ranges between ₹100-1100

## Database Architecture

The database architecture diagram can be found here: `https://drive.google.com/file/d/1lgTZoxdha1S72gfE6Ypv9cLvYImHMWhM/view?usp=sharing`

## Research Points

### 1. Data Source Strategy
In a production environment, reliable and legal data sources are critical. For NSE/BSE stock market data, here are viable options:

NSE India API (unofficial):
- Can be accessed using unofficial tools (third-party wrappers) that simplify the process
- Real-time data, but unofficial and subject to change

Alpha Vantage:
- Provides historical and some real-time data
- Free tier limited to 5 API calls/min and 500/day

Yahoo Finance API:
- Used via unofficial clients like yahoo-finance2
- Suitable for historical data

Nasdaq Data Link (formerly Quandl):
- Offers licensed financial data, including Indian markets
- Usually paid service

-> Considerations:
- Licensing: Always review usage terms. Free APIs may not allow commercial use
- Rate Limiting: Most free APIs have restrictions; use caching and backoff strategies in production
- Stability: Unofficial APIs may stop working without notice. Paid services are more stable for long-term use

### 2. Technology Stack & Framework
**Chosen: Node.js + Express.js**

Reasons:
- Fast development: Express is minimal and easy to set up
- Asynchronous by default: Ideal for I/O-heavy tasks like APIs and WebSockets
- Rich ecosystem: Tons of middleware, libraries, and community support
- WebSocket support: Seamless integration with Socket.IO for real-time data delivery
- Same language across frontend & backend: JavaScript everywhere simplifies collaboration and debugging

### 3. Database Selection
**Chosen: TimescaleDB (a time-series database built on PostgreSQL)**

Why:
- Optimized for time-series data like stock prices that arrive every few minutes
- Supports full SQL querying, unlike many NoSQL or proprietary time-series DBs. SQL compatibility means developers can use familiar query language, which reduces the learning curve
- Enables efficient filtering, aggregation, and retention of historical price data
- Easy to integrate into Node.js projects using PostgreSQL clients

## Contact
Niharika Sharma
6308niharika@gmail.com
Project Link: [https://github.com/Niharika209/financial-data-service]
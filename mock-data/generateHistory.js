// Generates mock historical stock price data for a given symbol and time range

function generateMockHistory(symbol, startDate, endDate, interval) {
  const data = [];
  const intervalMs = getIntervalInMs(interval);

  // Convert dates to timestamps for easier manipulation
  let currentTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  while (currentTime <= endTime) {
    data.push({
      symbol,
      // Generate random price between 100-1100 with 2 decimal places
      price: parseFloat((Math.random() * 1000 + 100).toFixed(2)),
      timestamp: new Date(currentTime).toISOString(),
      interval
    });
    currentTime += intervalMs;
  }

  return data;
}

/**
 * Helper function to convert interval strings to milliseconds
 * Defaults to 5min if invalid interval is provided
 */
function getIntervalInMs(interval) {
  const map = {
    '5min': 5 * 60 * 1000,    // 5 minutes in ms
    '15min': 15 * 60 * 1000,  // 15 minutes in ms 
    '1hour': 60 * 60 * 1000,  // 1 hour in ms
    '1day': 24 * 60 * 60 * 1000  // 1 day in ms
  };
  return map[interval] || 5 * 60 * 1000;
}

module.exports = generateMockHistory;
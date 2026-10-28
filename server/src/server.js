const app = require('./app');
const config = require('./config/env');
const { testConnection } = require('./config/db');

const startServer = async () => {
  // Verify database connection first
  const dbOk = await testConnection();
  if (!dbOk) {
    console.warn('[Warning] MySQL connection could not be verified at startup. Will retry on request.');
  }

  const server = app.listen(config.PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 ShopSphere Server running in ${config.NODE_ENV} mode`);
    console.log(`📡 URL: http://localhost:${config.PORT}`);
    console.log(`🏥 Health: http://localhost:${config.PORT}/api/health`);
    console.log(`====================================================`);
  });

  // Graceful shutdown
  const handleExit = (signal) => {
    console.log(`[Server] Received ${signal}. Closing gracefully...`);
    server.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleExit('SIGINT'));
  process.on('SIGTERM', () => handleExit('SIGTERM'));
};

startServer();

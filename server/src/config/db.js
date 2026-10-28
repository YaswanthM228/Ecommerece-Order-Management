const mysql = require('mysql2/promise');
const config = require('./env');

const pool = mysql.createPool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  decimalNumbers: true,
});

// Helper to execute parameterized queries cleanly
const query = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

// Helper for single row
const queryOne = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows[0] || null;
};

// Helper to test database connectivity
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log(`[Database] Connected successfully to MySQL (${config.DB_NAME} at ${config.DB_HOST}:${config.DB_PORT})`);
    return true;
  } catch (error) {
    console.error('[Database] Connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  query,
  queryOne,
  testConnection,
};

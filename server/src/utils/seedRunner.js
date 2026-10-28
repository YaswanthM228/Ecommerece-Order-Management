const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('../config/env');

async function runSeed() {
  console.log('[Seed] Connecting to MySQL...');
  const connection = await mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    multipleStatements: true,
  });

  try {
    const schemaPath = path.resolve(__dirname, '../../../database/schema.sql');
    const seedPath = path.resolve(__dirname, '../../../database/seed.sql');

    console.log('[Seed] Executing schema.sql...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await connection.query(schemaSql);
    console.log('[Seed] Schema created successfully.');

    console.log('[Seed] Executing seed.sql...');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await connection.query(seedSql);
    console.log('[Seed] Database seeded successfully with Indian e-commerce data!');
  } catch (err) {
    console.error('[Seed Error]:', err.message);
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  runSeed();
}

module.exports = runSeed;

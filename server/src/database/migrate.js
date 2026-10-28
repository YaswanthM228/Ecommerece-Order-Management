const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('../config/env');

async function migrate() {
  console.log('[Migrate] Connecting to MySQL server at', `${config.DB_HOST}:${config.DB_PORT}...`);
  
  // Connect without database first to ensure database exists
  const rootConn = await mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    multipleStatements: true,
  });

  try {
    console.log(`[Migrate] Ensuring database \`${config.DB_NAME}\` exists...`);
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConn.query(`USE \`${config.DB_NAME}\`;`);

    // Look for schema.sql in database/ or server/database/
    const schemaCandidates = [
      path.resolve(__dirname, '../../../database/schema.sql'),
      path.resolve(__dirname, '../../database/schema.sql'),
      path.resolve(__dirname, './schema.sql'),
    ];

    let schemaPath = schemaCandidates.find(p => fs.existsSync(p));
    if (!schemaPath) {
      throw new Error('schema.sql file not found in database directories');
    }

    console.log(`[Migrate] Executing schema from ${schemaPath}...`);
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await rootConn.query(schemaSql);

    console.log('[Migrate] Schema applied successfully!');
    
    // Check tables
    const [tables] = await rootConn.query('SHOW TABLES;');
    console.log(`[Migrate] Found ${tables.length} tables in \`${config.DB_NAME}\`:`);
    tables.forEach(t => console.log(`  - ${Object.values(t)[0]}`));
    
    return true;
  } catch (err) {
    console.error('[Migrate Error]:', err.message);
    throw err;
  } finally {
    await rootConn.end();
  }
}

if (require.main === module) {
  migrate()
    .then(() => {
      console.log('[Migrate] Completed successfully.');
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = migrate;

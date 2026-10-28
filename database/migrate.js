const migrate = require('../server/src/database/migrate');
if (require.main === module) {
  migrate().then(() => process.exit(0)).catch(() => process.exit(1));
}
module.exports = migrate;

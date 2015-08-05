/**
 * Production environment settings
 * @description :: This section overrides all other config values ONLY in production environment
 */

module.exports = {
  port: 3000,
  log: {
    level: 'info'
  },
  models: {
    connection: 'mysql'
  }
};

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '172.20.0.2',
  user: 'admin',
  password: 'W14i05l77!',
  database: 'db_washington'
});

module.exports = pool;
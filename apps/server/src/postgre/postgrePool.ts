const { Pool } = require('pg');

export const client = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'mydb',
    password: 'ADMIN',
    port: 5433,
  });
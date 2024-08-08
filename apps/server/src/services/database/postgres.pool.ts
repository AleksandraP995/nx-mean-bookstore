import { Pool } from 'pg';

export const client = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'mydb',
    password: 'ADMIN',
    port: 5433,
  });
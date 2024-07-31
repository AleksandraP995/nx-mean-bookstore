import { Client } from 'pg';

const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'mydb',
  password: 'ADMIN',
  port: 5433,
});

export const connectDB = () => {
    return client.connect()
      .then(() => {
        console.log('Connected to PostgreSQL');
      })
      .catch((err: any) => {
        console.error('Failed to connect to PostgreSQL', err);
        throw err;
      });
  };

export default client;

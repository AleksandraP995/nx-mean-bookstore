import { Server } from 'ws';
import { createServer } from 'http';
import { Express } from 'express';
import WebSocket from 'ws';

const clients: Set<WebSocket> = new Set();

export const setupWebSocket = (app: Express) => {
    const server = createServer(app);
    const wss = new Server({ server });

    wss.on('connection', (ws: WebSocket) => {
        clients.add(ws);
        ws.on('close', () => {
          clients.delete(ws);
        });
      });
  
    return { wss, clients, server };
  };

  export { clients };
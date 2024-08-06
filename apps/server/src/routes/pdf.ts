import express from 'express';
import { WebSocket } from 'ws'; 
import { clients } from "../websocket/webSocketSetup";
import { generatePDF } from '../websocket/generatePdfFile';
const router = express.Router();

router.post('/create-pdf', async (req, res) => {
  const { text, userId } = req.body;
  console.log(text, userId );
  try {
    await generatePDF(text, userId, (progress) => {
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ userId, status: 'progress', progress }));
        }
      });
    });
    res.status(200).json({ message: 'PDF generation successful' });
  } catch (error) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ userId, status: 'error', error: error.message }));
      }
    });
    res.status(500).json({ message: 'Error generating PDF' });
  }
});


export default router;
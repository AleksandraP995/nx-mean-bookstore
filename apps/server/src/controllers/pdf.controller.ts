import { generatePDF } from '../utils/helpers/pdfGenerator/generatePDF';
import { clients } from '../services/websocket.service';

export const generatePDFController = async (req, res) => {
    const { text, userId } = req.body;
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
  };

  export default generatePDFController;
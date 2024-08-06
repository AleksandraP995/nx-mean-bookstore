export interface WebSocketMessage {
    status: 'progress' | 'completed' | 'error';
    progress?: number;
    pdfPath?: string;
    error?: string;
    userId?: string;
  }
  
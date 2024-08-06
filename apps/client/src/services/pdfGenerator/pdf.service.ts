/* eslint-disable no-debugger */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WebSocketMessage } from '../../models/webSocketMessages'
@Injectable({
  providedIn: 'root'
})

export class PdfService {

  private socket$: WebSocket | null = null;
  private progressSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) {}

  createPdf(text: string, userId: string) {
    return this.http.post<string>(`${environment.settings.apiUrl}/pdf/create-pdf`, { text, userId });
  }

  connectWebSocket(userId: string): Observable<WebSocketMessage> {
    this.socket$ = new WebSocket(`ws://localhost:3000/ws?userId=${userId}`);

    this.socket$.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.status == 'progress') {
        this.progressSubject.next(message.progress);
      }
    };

    return new Observable<WebSocketMessage>(observer => {
      if(!this.socket$) { 
        console.error(`Socket not found`)  
        return;
      }
      this.socket$.onmessage = (event) => {
        observer.next(event.data);
      }
      this.socket$.onerror = (event) => {
        observer.error(event);
      }
      this.socket$.onclose = () => {
        observer.complete();
      }
      return () => this.socket$?.close();
    })
  }

  getProgress(): Observable<number> {
    return this.progressSubject.asObservable();
  }
}

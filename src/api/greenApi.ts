import type { SendMessageResponse, Notification } from '../types';

export class GreenApiClient {
  private idInstance: string;
  private apiTokenInstance: string;
  private apiUrl: string;

  constructor(idInstance: string, apiTokenInstance: string, apiUrl: string) {
    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;
    this.apiUrl = apiUrl;
  }

  async sendMessage(chatId: string, message: string): Promise<SendMessageResponse> {
    const formattedChatId = chatId.includes('@') ? chatId : `${chatId}@c.us`;

    const url = `${this.apiUrl}/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId: formattedChatId, message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send message: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  async receiveNotification(): Promise<Notification | null> {
    const url = `${this.apiUrl}/waInstance${this.idInstance}/receiveNotification/${this.apiTokenInstance}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to receive notification: ${response.statusText}`);
    }

    const data = await response.json();
    return data === false ? null : data;
  }

  async deleteNotification(receiptId: number): Promise<boolean> {
    const url = `${this.apiUrl}/waInstance${this.idInstance}/deleteNotification/${this.apiTokenInstance}/${receiptId}`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok;
  }
}

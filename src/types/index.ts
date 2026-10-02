export interface SendMessageResponse {
  idMessage: string;
}

export interface Notification {
  receiptId: number;
  body: {
    typeWebhook: string;
    chatId?: string;
    status?: string;
    instanceData?: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData?: {
      chatId: string;
      chatName?: string;
      chatType?: string;
      sender: string;
      senderName: string;
      senderType?: string;
      senderContactName?: string;
      senderPhoneNumber?: number | string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
        forwardingScore?: number;
        isForwarded?: boolean;
      };
    };
  };
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: number;
  status?: string;
}

export type View = 'auth' | 'chatList' | 'chat';

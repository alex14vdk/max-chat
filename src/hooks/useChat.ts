import { useState, useEffect, useRef, useCallback } from 'react';
import { GreenApiClient } from '../api/greenApi';
import type { Message } from '../types';

const STORAGE_MESSAGES_KEY = 'max_chat_messages_history';

export function useChat(
  apiClientRef: React.MutableRefObject<GreenApiClient | null>,
  chatId: string
) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_MESSAGES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const apiClient = apiClientRef.current;
    if (!apiClient || !chatId) return;

    const pollInterval = setInterval(async () => {
      try {
        const notification = await apiClient.receiveNotification();

        if (notification) {
          await apiClient.deleteNotification(notification.receiptId);

          if (notification.body.typeWebhook === 'incomingMessageReceived') {
            console.log('📥 Получено входящее сообщение:', notification.body);

            const rawChatId = String(
              notification.body.senderData?.chatId || notification.body.chatId || ''
            );
            const senderPhoneNumber = String(notification.body.senderData?.senderPhoneNumber || '');

            const normalizedNotificationChatId = rawChatId.replace(/@.*/, '');
            const normalizedSelectedChat = String(chatId).replace(/@.*/, '');

            const isMatchingChat =
              normalizedNotificationChatId === normalizedSelectedChat ||
              senderPhoneNumber === normalizedSelectedChat;

            if (isMatchingChat) {
              const newMessage: Message = {
                id: notification.body.idMessage,
                text: notification.body.messageData?.textMessageData?.textMessage || '',
                sender: 'other',
                timestamp: notification.body.timestamp,
              };

              setMessages((prev) => {
                if (prev.some((m) => m.id === newMessage.id)) return prev;
                return [...prev, newMessage];
              });
            } else {
              console.log(
                `⚠️ Сообщение из другого чата. Ожидаем: ${normalizedSelectedChat}, Получено chatId: ${normalizedNotificationChatId}, phone: ${senderPhoneNumber}`
              );
            }
          } else if (notification.body.typeWebhook === 'outgoingMessageStatus') {
            console.log(
              `📤 Статус сообщения ${notification.body.idMessage}:`,
              notification.body.status
            );

            if (notification.body.status === 'noAccount') {
              console.warn(
                '⚠️ Номер не найден в мессенджере. Убедитесь, что на номере установлен MAX/WhatsApp.'
              );
            }
          }
        }
      } catch (error) {
        console.error('Error receiving/deleting notification:', error);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [apiClientRef, chatId]);

  const sendMessage = useCallback(
    async (text: string) => {
      const apiClient = apiClientRef.current;
      if (!apiClient || !text.trim()) return false;

      setIsLoading(true);
      try {
        const response = await apiClient.sendMessage(chatId, text);

        const newMessage: Message = {
          id: response.idMessage,
          text,
          sender: 'me',
          timestamp: Date.now() / 1000,
          status: 'pending',
        };

        setMessages((prev) => [...prev, newMessage]);
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Ошибка отправки. Проверьте консоль и формат номера.');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [apiClientRef, chatId]
  );
  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_MESSAGES_KEY);
  }, []);

  return {
    messages,
    isLoading,
    messagesEndRef,
    sendMessage,
    clearMessages,
  };
}

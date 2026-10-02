import { useState, useRef, useEffect } from 'react';
import { GreenApiClient } from './api/greenApi';
import { useChat } from './hooks/useChat';
import { AuthPage } from './pages/AuthPage';
import { ChatListPage } from './pages/ChatListPage';
import { ChatPage } from './pages/ChatPage';
import type { View } from './types';

function App() {
  const [apiUrl, setApiUrl] = useState(
    () => localStorage.getItem('max_api_url') || 'https://3100.api.green-api.com'
  );
  const [idInstance, setIdInstance] = useState(() => localStorage.getItem('max_id_instance') || '');
  const [apiTokenInstance, setApiTokenInstance] = useState(
    () => localStorage.getItem('max_api_token') || ''
  );
  const [selectedChat, setSelectedChat] = useState(
    () => localStorage.getItem('max_selected_chat') || ''
  );
  const [chatIdInput, setChatIdInput] = useState(
    () => localStorage.getItem('max_selected_chat') || ''
  );

  const [currentView, setCurrentView] = useState<View>(() => {
    if (localStorage.getItem('max_api_token') && localStorage.getItem('max_selected_chat')) {
      return 'chat';
    }
    if (localStorage.getItem('max_api_token')) {
      return 'chatList';
    }
    return 'auth';
  });

  const [inputMessage, setInputMessage] = useState('');
  const apiClientRef = useRef<GreenApiClient | null>(null);

  const { messages, isLoading, messagesEndRef, sendMessage, clearMessages } = useChat(
    apiClientRef,
    selectedChat
  );

  useEffect(() => {
    if (idInstance && apiTokenInstance && apiUrl) {
      apiClientRef.current = new GreenApiClient(idInstance, apiTokenInstance, apiUrl);
    }
  }, []);

  const handleAuth = () => {
    if (!apiUrl || !idInstance || !apiTokenInstance) {
      alert('Пожалуйста, заполните все поля авторизации');
      return;
    }

    localStorage.setItem('max_api_url', apiUrl);
    localStorage.setItem('max_id_instance', idInstance);
    localStorage.setItem('max_api_token', apiTokenInstance);

    apiClientRef.current = new GreenApiClient(idInstance, apiTokenInstance, apiUrl);
    setCurrentView('chatList');
  };

  const handleCreateChat = () => {
    if (!chatIdInput.trim()) {
      alert('Пожалуйста, введите номер телефона');
      return;
    }

    const finalChatId = chatIdInput.trim();

    localStorage.setItem('max_selected_chat', finalChatId);
    setSelectedChat(finalChatId);
    clearMessages();
    setCurrentView('chat');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const success = await sendMessage(inputMessage);
    if (success) {
      setInputMessage('');
    } else {
      alert('Не удалось отправить сообщение. Проверьте консоль.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('max_api_url');
    localStorage.removeItem('max_id_instance');
    localStorage.removeItem('max_api_token');
    localStorage.removeItem('max_selected_chat');
    localStorage.removeItem('max_chat_messages_history');
    window.location.reload();
  };

  if (currentView === 'auth') {
    return (
      <AuthPage
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        idInstance={idInstance}
        setIdInstance={setIdInstance}
        apiTokenInstance={apiTokenInstance}
        setApiTokenInstance={setApiTokenInstance}
        onAuth={handleAuth}
      />
    );
  }

  if (currentView === 'chatList') {
    return (
      <ChatListPage
        chatIdInput={chatIdInput}
        setChatIdInput={setChatIdInput}
        onCreateChat={handleCreateChat}
        onBack={handleLogout}
      />
    );
  }

  return (
    <ChatPage
      selectedChat={selectedChat}
      messages={messages}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      onSend={handleSendMessage}
      onBack={() => setCurrentView('chatList')}
      isLoading={isLoading}
      messagesEndRef={messagesEndRef}
    />
  );
}

export default App;

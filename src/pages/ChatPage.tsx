import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { ChatBackground } from '../components/ChatBackground';
import type { Message } from '../types';
import { formatDateSeparator, isDifferentDay } from '../utils/date';
import { DateSeparator } from '../components/DateSeparator';

interface ChatPageProps {
  selectedChat: string;
  messages: Message[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onSend: () => void;
  onBack: () => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatPage({
  selectedChat,
  messages,
  inputMessage,
  setInputMessage,
  onSend,
  onBack,
  isLoading,
  messagesEndRef,
}: ChatPageProps) {
  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-gray-100">
      <ChatBackground />
      <header className="relative z-10 flex w-full flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm backdrop-blur-sm md:px-6">
        <div className="flex h-10 items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title="Вернуться к выбору чата"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" className="text-black">
              <path fill="currentColor"
                    d="m7.825 13 4.887 4.888a.999.999 0 0 1-1.412 1.413l-6.593-6.593a1 1 0 0 1 0-1.415L11.3 4.7a.999.999 0 1 1 1.412 1.413L7.825 11H19a1 1 0 1 1 0 2z"></path>
            </svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-800">{selectedChat}</h1>
            <p className="text-xs text-gray-500">Был(-а) недавно</p>
          </div>
        </div>
      </header>
      <main className="custom-scrollbar relative z-10 w-full flex-1 scroll-smooth">
        <div className="mx-auto h-full w-full max-w-187 content-end px-4 py-4 md:px-6 md:py-6">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const isFirstInGroup = !prevMessage || prevMessage.sender !== message.sender;

            const showDateSeparator = !prevMessage || isDifferentDay(prevMessage.timestamp, message.timestamp);

            return (
              <div key={message.id}>
                {showDateSeparator && (
                  <DateSeparator date={formatDateSeparator(message.timestamp)} />
                )}

                <MessageBubble
                  message={message}
                  isFirstInGroup={isFirstInGroup}
                />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <MessageInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={onSend}
        isLoading={isLoading}
      />
    </div>
  );
}

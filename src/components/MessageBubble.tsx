import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isFirstInGroup?: boolean;
}

export function MessageBubble({ message, isFirstInGroup = true }: MessageBubbleProps) {
  const isMe = message.sender === 'me';
  const time = new Date(message.timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}  ${
      isFirstInGroup ? 'mt-3' : 'mt-0.5'
    }`}>
      <div
        className={`leading-5 relative flex max-w-[85%] items-end rounded-2xl border border-gray-200 p-2.5 pt-2 text-gray-800 shadow-sm md:max-w-md ${
          isMe ? 'rounded-br-md bubble' : 'rounded-bl-md bg-white'
        }`}
      >
        <p className="text-[16px] whitespace-pre-wrap">{message.text}<span className="inline-block h-4 w-8.25" /></p>
        <p className={`absolute right-2.5 bottom-1 h-4 text-[11px] ${isMe ? 'text-sky-600' : 'text-[#06070885]'}`}>{time}</p>
      </div>
    </div>
  );
}

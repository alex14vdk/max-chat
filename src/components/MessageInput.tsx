import { useRef, useEffect } from 'react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function MessageInput({ value, onChange, onSend, isLoading, disabled }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 228);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative z-10">
      <div className="mx-auto w-full max-w-187 space-y-4 px-4 py-4 pt-1 md:px-5">
        <div className="relative flex flex-1 items-end">

          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            className="custom-scrollbar flex-1 resize-none overflow-y-auto rounded-2xl bg-white px-4 py-3 pr-14 text-gray-800 placeholder-gray-500 transition-all focus:bg-white focus:ring-blue-500 focus:outline-none"
            style={{ minHeight: '48px' }}
            placeholder="Сообщение"
            disabled={isLoading || disabled}
          />

          {!!value && (
            <button
              className="absolute right-3 bottom-2 flex size-8 cursor-pointer items-center justify-center rounded-full border-none bg-blue-500 p-0 text-white outline-none transition-colors hover:bg-blue-600 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={onSend}
              disabled={isLoading || disabled}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M5.29 11.705a1 1 0 0 1 .005-1.415l6.015-5.97a1 1 0 0 1 1.41.001l5.987 5.972a1 1 0 0 1-1.412 1.416l-4.28-4.27v11.533a1 1 0 1 1-2 0V7.43l-4.31 4.279a1 1 0 0 1-1.414-.005"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

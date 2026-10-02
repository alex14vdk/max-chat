interface ChatListPageProps {
  chatIdInput: string;
  setChatIdInput: (value: string) => void;
  onCreateChat: () => void;
  onBack: () => void;
}

export function ChatListPage({
  chatIdInput,
  setChatIdInput,
  onCreateChat,
  onBack,
}: ChatListPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Новый чат</h2>
          <p className="mt-2 text-gray-500">Введите номер телефона получателя</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Номер телефона</label>
            <input
              type="text"
              value={chatIdInput}
              onChange={(e) => setChatIdInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onCreateChat()}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="79876624994"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              * Суффикс чата будет добавлен автоматически
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-200"
            >
              Назад
            </button>
            <button
              onClick={onCreateChat}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              Начать чат
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

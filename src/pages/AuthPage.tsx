interface AuthPageProps {
  apiUrl: string;
  setApiUrl: (value: string) => void;
  idInstance: string;
  setIdInstance: (value: string) => void;
  apiTokenInstance: string;
  setApiTokenInstance: (value: string) => void;
  onAuth: () => void;
}

export function AuthPage({
  apiUrl,
  setApiUrl,
  idInstance,
  setIdInstance,
  apiTokenInstance,
  setApiTokenInstance,
  onAuth,
}: AuthPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">MAX Chat</h1>
          <p className="mt-2 text-gray-500">Введите данные инстанса GREEN-API</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">API URL</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://3100.api.green-api.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">ID Instance</label>
            <input
              type="text"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="1101000000"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              API Token Instance
            </label>
            <input
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ваш токен"
            />
          </div>
          <button
            onClick={onAuth}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Подключиться
          </button>
        </div>
      </div>
    </div>
  );
}

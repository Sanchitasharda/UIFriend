import { usePaletteStore } from '../store/paletteStore';

export function Toast() {
  const toasts = usePaletteStore((state) => state.toasts);
  const removeToast = usePaletteStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] rounded-full px-6 py-3 shadow-xl flex items-center justify-between gap-4 ${toast.type === 'success' ? 'bg-[#2D2A26] text-white' : ''} ${toast.type === 'error' ? 'bg-red-500 text-white' : ''} ${toast.type === 'info' ? 'bg-white text-[#2D2A26]' : ''}`}
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <span className="text-sm font-semibold">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-60 hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

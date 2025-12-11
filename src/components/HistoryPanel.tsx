import { useState, useEffect } from 'react';
import { usePaletteStore } from '../store/paletteStore';
import {
  getPaletteHistory,
  deletePaletteFromHistory,
  clearPaletteHistory,
  type SavedPalette
} from '../utils/localStorage';

export function HistoryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<SavedPalette[]>([]);
  const colors = usePaletteStore((state) => state.colors);
  const updateColor = usePaletteStore((state) => state.updateColor);
  const addToast = usePaletteStore((state) => state.addToast);

  useEffect(() => {
    setHistory(getPaletteHistory());
  }, [colors]);

  const loadPalette = (palette: SavedPalette) => {
    palette.colors.forEach((color, index) => {
      updateColor(index, color.hex);
    });
    addToast('Palette loaded from history', 'success');
    setIsOpen(false);
  };

  const deletePalette = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePaletteFromHistory(id);
    setHistory(getPaletteHistory());
    addToast('Palette deleted', 'info');
  };

  const clearHistory = () => {
    if (window.confirm('Clear all palette history?')) {
      clearPaletteHistory();
      setHistory([]);
      addToast('History cleared', 'info');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-8 bottom-8 z-40 btn-icon h-14 w-14 flex items-center justify-center shadow-xl bg-white"
        aria-label="Toggle history panel"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-[#2D2A26]/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="fixed left-0 top-0 z-50 h-full w-96 bg-[#FDFBF7] shadow-2xl overflow-hidden rounded-r-[2.5rem] border-r border-white/50"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="flex flex-col h-full">
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-[#2D2A26]">History</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#8A8580] hover:text-[#2D2A26]"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-[#8A8580]">Your previously generated palettes</p>

                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="mt-4 text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-wide"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-[#8A8580]">
                    <svg className="h-12 w-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No palettes yet</p>
                  </div>
                ) : (
                  history.map((palette) => (
                    <div
                      key={palette.id}
                      className="clay-card p-4 cursor-pointer group"
                      onClick={() => loadPalette(palette)}
                    >
                      <div className="flex h-12 rounded-xl overflow-hidden mb-3 shadow-sm">
                        {palette.colors.map((color, i) => (
                          <div
                            key={i}
                            className="flex-1"
                            style={{ background: color.hex }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#8A8580]">{new Date(palette.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-3">
                          {palette.harmonyType && (
                            <span className="capitalize text-[#2D2A26] font-semibold bg-gray-100 px-2 py-0.5 rounded">{palette.harmonyType}</span>
                          )}
                          <button
                            onClick={(e) => deletePalette(palette.id, e)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

import { useState, useRef, useEffect } from 'react';
import { usePaletteStore } from '../store/paletteStore';
import type { ExportFormat } from '../types';

export function ExportMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const exportPalette = usePaletteStore((state) => state.exportPalette);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleExport = async (format: ExportFormat) => {
    await exportPalette(format);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center gap-2"
        aria-label="Export palette"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Export
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-3 w-48 clay-card py-2 z-50"
          style={{ animation: 'scaleIn 0.15s ease-out' }}
        >
          <button
            onClick={() => handleExport('png')}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#2D2A26] hover:bg-gray-50 transition-colors"
          >
            PNG Image
          </button>
          <button
            onClick={() => handleExport('css')}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#2D2A26] hover:bg-gray-50 transition-colors"
          >
            CSS Code
          </button>
          <button
            onClick={() => handleExport('json')}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#2D2A26] hover:bg-gray-50 transition-colors"
          >
            JSON Data
          </button>
        </div>
      )}
    </div>
  );
}

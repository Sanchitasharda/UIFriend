import { useEffect } from 'react';
import { usePaletteStore } from '../store/paletteStore';

export function useKeyboardShortcuts() {
  const generatePalette = usePaletteStore((state) => state.generatePalette);
  const setActiveColorIndex = usePaletteStore((state) => state.setActiveColorIndex);
  const activeColorIndex = usePaletteStore((state) => state.activeColorIndex);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if typing in input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        generatePalette();
      }

      if (e.code === 'Escape' && activeColorIndex !== null) {
        setActiveColorIndex(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette, setActiveColorIndex, activeColorIndex]);
}

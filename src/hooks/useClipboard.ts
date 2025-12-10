import { useCallback } from 'react';
import { usePaletteStore } from '../store/paletteStore';

export function useClipboard() {
  const addToast = usePaletteStore((state) => state.addToast);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        addToast(`Copied ${text}`, 'success');
        return true;
      } catch (err) {
        console.error('Failed to copy:', err);
        addToast('Failed to copy to clipboard', 'error');
        return false;
      }
    },
    [addToast]
  );

  return { copyToClipboard };
}

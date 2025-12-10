import { useState } from 'react';
import { usePaletteStore } from '../store/paletteStore';
import { copyPaletteURL } from '../utils/urlSharing';

export function ShareButton() {
  const colors = usePaletteStore((state) => state.colors);
  const addToast = usePaletteStore((state) => state.addToast);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await copyPaletteURL(colors);
      addToast('Link copied!', 'success');
    } catch (error) {
      addToast('Failed to copy', 'error');
    }
    setIsSharing(false);
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="btn-secondary flex items-center gap-2 disabled:opacity-50"
      aria-label="Share palette"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      Share
    </button>
  );
}

import { getTextColor } from '../utils/colorConversion';

interface LockButtonProps {
  locked: boolean;
  onToggle: (e: React.MouseEvent) => void;
  colorHex: string;
}

export function LockButton({ locked, onToggle, colorHex }: LockButtonProps) {
  // We ignore colorHex for text color now, as we are using a white pill button style
  // or we can adapt it. For the "Clay" look, a white circle is best.

  return (
    <button
      onClick={onToggle}
      className={`rounded-full p-3 shadow-md transition-all duration-300 hover:scale-110 ${locked ? 'bg-white text-[#E07A5F]' : 'bg-white/30 backdrop-blur-sm text-white hover:bg-white hover:text-[#2D2A26]'}`}
      aria-label={locked ? 'Unlock color' : 'Lock color'}
    >
      {locked ? (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

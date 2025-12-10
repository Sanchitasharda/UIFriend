import { memo } from 'react';
import type { Color } from '../types';
import { getTextColor } from '../utils/colorConversion';
import { useClipboard } from '../hooks/useClipboard';
import { LockButton } from './LockButton';
import { usePaletteStore } from '../store/paletteStore';

interface ColorSwatchProps {
  color: Color;
  index: number;
  onColorClick: (index: number) => void;
  dragHandle?: any;
}

export const ColorSwatch = memo(({ color, index, onColorClick, dragHandle }: ColorSwatchProps) => {
  const { copyToClipboard } = useClipboard();
  const toggleLock = usePaletteStore((state) => state.toggleLock);
  const textColor = getTextColor(color.hex);

  const handleSwatchClick = () => {
    onColorClick(index);
  };

  const handleHexClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(color.hex);
  };

  const handleLockToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLock(index);
  };

  return (
    <div
      className="group relative h-full w-full flex flex-col transition-all duration-500 hover:-translate-y-4"
      onClick={handleSwatchClick}
    >
      {/* The Color Card */}
      <div
        className="relative flex-1 rounded-[2rem] shadow-lg transition-shadow duration-300 group-hover:shadow-2xl overflow-hidden"
        style={{ backgroundColor: color.hex }}
      >
        {/* Overlay for interaction hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Drag Handle - Top left corner */}
        {dragHandle && (
          <div
            {...dragHandle}
            className="absolute top-2 left-2 cursor-grab active:cursor-grabbing p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/10 rounded-lg backdrop-blur-sm"
            style={{ touchAction: 'none' }}
          >
            <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="8" cy="6" r="2" />
              <circle cx="16" cy="6" r="2" />
              <circle cx="8" cy="12" r="2" />
              <circle cx="16" cy="12" r="2" />
              <circle cx="8" cy="18" r="2" />
              <circle cx="16" cy="18" r="2" />
            </svg>
          </div>
        )}

        {/* Lock Button - Single instance with conditional visibility */}
        <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${
          color.locked ? '' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <LockButton locked={color.locked} onToggle={handleLockToggle} colorHex={color.hex} />
        </div>
      </div>

      {/* The Info Label (Clay style) */}
      <div className="mt-4 flex flex-col items-center justify-center">
        <button
          onClick={handleHexClick}
          className="font-mono text-lg font-bold text-[#2D2A26] tracking-wider hover:text-[#E07A5F] transition-colors uppercase"
        >
          {color.hex}
        </button>
        <p className="text-sm font-medium text-[#8A8580] mt-1">{color.name}</p>
      </div>
    </div>
  );
});

ColorSwatch.displayName = 'ColorSwatch';

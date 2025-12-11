import { HexColorPicker, HexColorInput } from 'react-colorful';
import { usePaletteStore } from '../store/paletteStore';

interface ColorPickerProps {
  isOpen: boolean;
  colorIndex: number;
}

export function ColorPicker({ isOpen, colorIndex }: ColorPickerProps) {
  const colors = usePaletteStore((state) => state.colors);
  const updateColor = usePaletteStore((state) => state.updateColor);
  const setActiveColorIndex = usePaletteStore((state) => state.setActiveColorIndex);

  if (!isOpen) return null;

  const color = colors[colorIndex];
  if (!color) return null;

  const handleClose = () => {
    setActiveColorIndex(null);
  };

  const handleColorChange = (newColor: string) => {
    updateColor(colorIndex, newColor);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/20 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className="relative z-10 clay-panel p-8 w-full max-w-sm"
        style={{ animation: 'scaleIn 0.2s ease-out' }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2D2A26]">Edit Color</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-[#8A8580] hover:bg-gray-100 hover:text-[#2D2A26] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <HexColorPicker color={color.hex} onChange={handleColorChange} style={{ width: '100%', height: '200px' }} />
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8A8580]">
              Hex Code
            </label>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full shadow-inner border border-gray-100" style={{ backgroundColor: color.hex }}></div>
              <HexColorInput
                color={color.hex}
                onChange={handleColorChange}
                className="flex-1 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2 font-mono text-lg uppercase text-[#2D2A26] focus:border-[#E07A5F] focus:outline-none transition-colors"
                prefixed
              />
            </div>
          </div>

          <div className="pt-2 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-[#8A8580]">
              {color.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

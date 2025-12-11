import { ExportMenu } from './ExportMenu';
import { HarmonySelector } from './HarmonySelector';
import { ShareButton } from './ShareButton';
import { usePaletteStore } from '../store/paletteStore';

export function Toolbar() {
  const generatePalette = usePaletteStore((state) => state.generatePalette);

  return (
    <div className="fixed left-0 right-0 top-0 z-40 px-10 py-8">
      <div className="mx-auto max-w-[1600px] clay-card px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#E07A5F] flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#2D2A26]">
              uifriend
            </h1>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <span className="text-sm font-medium text-[#8A8580] bg-[#F5F5F0] px-4 py-2 rounded-full border border-gray-100">
            Press <kbd className="font-bold text-[#2D2A26]">Space</kbd> to generate
          </span>
        </div>

        <div className="flex items-center gap-4">
          <HarmonySelector />
          <div className="h-8 w-px bg-gray-200 mx-1"></div>
          <ShareButton />
          <ExportMenu />
          <button
            onClick={generatePalette}
            className="btn-primary flex items-center gap-2 ml-3"
            aria-label="Generate new palette"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

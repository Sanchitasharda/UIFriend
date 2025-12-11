import { useState } from 'react';
import { usePaletteStore } from '../store/paletteStore';
import { getAllPairwiseContrasts } from '../utils/accessibility';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const colors = usePaletteStore((state) => state.colors);
  const contrasts = getAllPairwiseContrasts(colors.map(c => c.hex));

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-8 top-32 z-40 btn-icon"
        aria-label="Toggle accessibility checker"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#2D2A26]/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative clay-panel p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" style={{ animation: 'scaleIn 0.2s ease-out' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#2D2A26]">
                  Contrast Checker
                </h3>
                <p className="text-sm text-[#8A8580]">WCAG 2.1 Compliance</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8A8580] hover:text-[#2D2A26]"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {contrasts.map(({ color1, color2, result }, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl shadow-inner" style={{ background: color1 }} />
                      <span className="text-xl text-gray-300 font-light">vs</span>
                      <div className="w-12 h-12 rounded-xl shadow-inner" style={{ background: color2 }} />
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#2D2A26]">
                        {result.ratio}:1
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Badge pass={result.aaNormal} label="AA Normal" />
                    <Badge pass={result.aaLarge} label="AA Large" />
                    <Badge pass={result.aaaNormal} label="AAA Normal" />
                    <Badge pass={result.aaaLarge} label="AAA Large" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold border ${ pass ? 'bg-[#81B29A]/10 border-[#81B29A]/20 text-[#2D2A26]' : 'bg-gray-50 border-gray-100 text-gray-400' }`}>
      <span className="mb-1">{label}</span>
      {pass ? (
        <div className="h-5 w-5 rounded-full bg-[#81B29A] flex items-center justify-center text-white">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-white">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}
    </div>
  );
}

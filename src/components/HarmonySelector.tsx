import { usePaletteStore } from '../store/paletteStore';
import type { HarmonyType } from '../utils/colorGeneration';

export function HarmonySelector() {
  const harmonyType = usePaletteStore((state) => state.harmonyType);
  const setHarmonyType = usePaletteStore((state) => state.setHarmonyType);

  const options: { value: HarmonyType; label: string }[] = [
    { value: 'random', label: 'Random' },
    { value: 'analogous', label: 'Analogous' },
    { value: 'complementary', label: 'Complementary' },
    { value: 'triadic', label: 'Triadic' },
    { value: 'split-complementary', label: 'Split Comp' },
    { value: 'tetradic', label: 'Tetradic' }
  ];

  return (
    <div className="relative group">
      <select
        value={harmonyType}
        onChange={(e) => setHarmonyType(e.target.value as HarmonyType)}
        className="appearance-none btn-secondary pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20"
        aria-label="Select harmony type"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

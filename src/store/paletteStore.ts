import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Color, ExportFormat, Toast } from '../types';
import { generateHarmoniousPalette, generateRandomColor, type HarmonyType } from '../utils/colorGeneration';
import { getColorName } from '../utils/colorNaming';
import { exportAsPNG, exportAsCSS, exportAsJSON } from '../utils/exportFormats';
import { savePaletteToHistory } from '../utils/localStorage';

interface PaletteState {
  colors: Color[];
  activeColorIndex: number | null;
  toasts: Toast[];
  harmonyType: HarmonyType;

  generatePalette: () => void;
  updateColor: (index: number, hex: string) => void;
  setActiveColorIndex: (index: number | null) => void;
  toggleLock: (index: number) => void;
  setHarmonyType: (type: HarmonyType) => void;
  reorderColors: (oldIndex: number, newIndex: number) => void;
  exportPalette: (format: ExportFormat) => Promise<void>;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const createInitialPalette = (): Color[] => {
  const hexColors = generateHarmoniousPalette();
  return hexColors.map((hex) => ({
    hex,
    name: getColorName(hex),
    locked: false,
  }));
};

export const usePaletteStore = create<PaletteState>()(
  devtools(
    (set, get) => ({
      colors: createInitialPalette(),
      activeColorIndex: null,
      toasts: [],
      harmonyType: 'random' as HarmonyType,

      generatePalette: () => {
        set((state) => {
          const newHexColors = generateHarmoniousPalette(state.harmonyType);
          const newColors = state.colors.map((color, index) => {
            if (color.locked) return color;
            const hex = newHexColors[index];
            return {
              hex,
              name: getColorName(hex),
              locked: false,
            };
          });

          // Auto-save to history
          savePaletteToHistory(newColors, state.harmonyType);

          return { colors: newColors };
        });
      },

      updateColor: (index: number, hex: string) => {
        set((state) => {
          const newColors = [...state.colors];
          newColors[index] = {
            hex: hex.toUpperCase(),
            name: getColorName(hex),
            locked: newColors[index].locked,
          };
          return { colors: newColors };
        });
      },

      setActiveColorIndex: (index: number | null) => {
        set({ activeColorIndex: index });
      },

      toggleLock: (index: number) => {
        set((state) => {
          const newColors = [...state.colors];
          newColors[index] = {
            ...newColors[index],
            locked: !newColors[index].locked,
          };

          // Persist lock state to history
          savePaletteToHistory(newColors, state.harmonyType);

          return { colors: newColors };
        });
      },

      setHarmonyType: (type: HarmonyType) => set({ harmonyType: type }),

      reorderColors: (oldIndex: number, newIndex: number) => {
        set((state) => {
          const newColors = [...state.colors];
          const [removed] = newColors.splice(oldIndex, 1);
          newColors.splice(newIndex, 0, removed);
          return { colors: newColors };
        });
      },

      exportPalette: async (format: ExportFormat) => {
        const { colors, addToast } = get();
        try {
          switch (format) {
            case 'png':
              await exportAsPNG('palette-container');
              addToast('Palette exported as PNG', 'success');
              break;
            case 'css':
              exportAsCSS(colors);
              addToast('Palette exported as CSS', 'success');
              break;
            case 'json':
              exportAsJSON(colors);
              addToast('Palette exported as JSON', 'success');
              break;
          }
        } catch (error) {
          console.error('Export error:', error);
          addToast('Failed to export palette', 'error');
        }
      },

      addToast: (message: string, type: Toast['type']) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));

        setTimeout(() => {
          get().removeToast(id);
        }, 3000);
      },

      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },
    }),
    { name: 'palette-store' }
  )
);

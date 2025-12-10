import type { Color } from '../types';
import type { HarmonyType } from './colorGeneration';

const STORAGE_KEY = 'uifriend_palette_history';
const MAX_HISTORY = 20;

export interface SavedPalette {
  id: string;
  colors: Color[];
  createdAt: string;
  harmonyType?: HarmonyType;
}

export function savePaletteToHistory(colors: Color[], harmonyType: HarmonyType): void {
  try {
    const history = getPaletteHistory();
    const newPalette: SavedPalette = {
      id: crypto.randomUUID(),
      colors: colors.map(c => ({ ...c })),
      createdAt: new Date().toISOString(),
      harmonyType
    };

    history.unshift(newPalette);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
}

export function getPaletteHistory(): SavedPalette[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function deletePaletteFromHistory(id: string): void {
  try {
    const history = getPaletteHistory().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to delete from history:', error);
  }
}

export function clearPaletteHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

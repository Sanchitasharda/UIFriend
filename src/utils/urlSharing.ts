import type { Color } from '../types';
import { getColorName } from './colorNaming';

export function encodeColorsToURL(colors: Color[]): string {
  const hexValues = colors.map(c => c.hex.replace('#', '')).join('-');
  const baseURL = window.location.origin + window.location.pathname;
  return `${baseURL}?colors=${hexValues}`;
}

export function decodeColorsFromURL(): Color[] | null {
  const params = new URLSearchParams(window.location.search);
  const colorsParam = params.get('colors');

  if (!colorsParam) return null;

  const hexValues = colorsParam.split('-');
  if (hexValues.length !== 5) return null;

  // Validate hex format
  const hexRegex = /^[0-9A-Fa-f]{6}$/;
  if (!hexValues.every(hex => hexRegex.test(hex))) return null;

  return hexValues.map(hex => ({
    hex: '#' + hex.toUpperCase(),
    name: getColorName('#' + hex),
    locked: false
  }));
}

export async function copyPaletteURL(colors: Color[]): Promise<string> {
  const url = encodeColorsToURL(colors);
  await navigator.clipboard.writeText(url);
  return url;
}

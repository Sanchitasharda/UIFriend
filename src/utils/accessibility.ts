import { hexToRgb } from './colorConversion';

export interface ContrastResult {
  ratio: number;
  aaLarge: boolean;
  aaNormal: boolean;
  aaaLarge: boolean;
  aaaNormal: boolean;
}

function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);

  const [rs, gs, bs] = [r, g, b].map(val => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio: Math.round(ratio * 100) / 100,
    aaLarge: ratio >= 3,
    aaNormal: ratio >= 4.5,
    aaaLarge: ratio >= 4.5,
    aaaNormal: ratio >= 7
  };
}

export function getAllPairwiseContrasts(colors: string[]): Array<{
  color1: string;
  color2: string;
  result: ContrastResult;
}> {
  const results: Array<{ color1: string; color2: string; result: ContrastResult }> = [];

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      results.push({
        color1: colors[i],
        color2: colors[j],
        result: checkContrast(colors[i], colors[j])
      });
    }
  }

  return results;
}

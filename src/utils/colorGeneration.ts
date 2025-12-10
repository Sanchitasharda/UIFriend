import { hslToHex } from './colorConversion';

export type HarmonyType = 'analogous' | 'complementary' | 'triadic' | 'split-complementary' | 'tetradic' | 'random';

export function generateHarmoniousPalette(type: HarmonyType = 'random'): string[] {
  const baseHue = Math.floor(Math.random() * 360);

  switch (type) {
    case 'analogous':
      return generateAnalogousPalette(baseHue);
    case 'complementary':
      return generateComplementaryPalette(baseHue);
    case 'triadic':
      return generateTriadicPalette(baseHue);
    case 'split-complementary':
      return generateSplitComplementaryPalette(baseHue);
    case 'tetradic':
      return generateTetradicPalette(baseHue);
    default:
      return generateRandomHarmoniousPalette(baseHue);
  }
}

function generateAnalogousPalette(baseHue: number): string[] {
  const hues = [
    baseHue,
    (baseHue + 30) % 360,
    (baseHue + 60) % 360,
    (baseHue - 30 + 360) % 360,
    (baseHue - 60 + 360) % 360,
  ];

  return hues.map((hue) => {
    const s = 65 + Math.random() * 25; // 65-90%
    const l = 45 + Math.random() * 25; // 45-70%
    return hslToHex(hue, s, l);
  });
}

function generateComplementaryPalette(baseHue: number): string[] {
  const complementHue = (baseHue + 180) % 360;

  const hues = [
    baseHue,
    (baseHue + 15) % 360,
    complementHue,
    (complementHue + 15) % 360,
    (complementHue + 30) % 360,
  ];

  return hues.map((hue) => {
    const s = 65 + Math.random() * 25;
    const l = 45 + Math.random() * 25;
    return hslToHex(hue, s, l);
  });
}

function generateTriadicPalette(baseHue: number): string[] {
  const hue2 = (baseHue + 120) % 360;
  const hue3 = (baseHue + 240) % 360;

  const hues = [
    baseHue,
    (baseHue + 15) % 360,
    hue2,
    (hue2 + 15) % 360,
    hue3,
  ];

  return hues.map((hue) => {
    const s = 65 + Math.random() * 25;
    const l = 45 + Math.random() * 25;
    return hslToHex(hue, s, l);
  });
}

function generateSplitComplementaryPalette(baseHue: number): string[] {
  const complement = (baseHue + 180) % 360;
  const split1 = (complement - 30 + 360) % 360;
  const split2 = (complement + 30) % 360;

  const hues = [
    baseHue,
    (baseHue + 15) % 360,
    split1,
    split2,
    ((split1 + split2) / 2) % 360
  ];

  return hues.map((hue) => {
    const s = 65 + Math.random() * 25;
    const l = 45 + Math.random() * 25;
    return hslToHex(hue, s, l);
  });
}

function generateTetradicPalette(baseHue: number): string[] {
  const hue2 = (baseHue + 90) % 360;
  const hue3 = (baseHue + 180) % 360;
  const hue4 = (baseHue + 270) % 360;

  const hues = [baseHue, hue2, hue3, hue4, (baseHue + 45) % 360];

  return hues.map((hue) => {
    const s = 65 + Math.random() * 25;
    const l = 45 + Math.random() * 25;
    return hslToHex(hue, s, l);
  });
}

function generateRandomHarmoniousPalette(baseHue: number): string[] {
  const harmonyTypes: HarmonyType[] = ['analogous', 'complementary', 'triadic', 'split-complementary', 'tetradic'];
  const randomType = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)] as HarmonyType;

  return generateHarmoniousPalette(randomType);
}

export function generateRandomColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = 65 + Math.random() * 25;
  const l = 45 + Math.random() * 25;
  return hslToHex(h, s, l);
}

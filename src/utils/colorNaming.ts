import namer from 'color-namer';

export function getColorName(hex: string): string {
  try {
    const names = namer(hex, { pick: ['ntc'] });
    return names.ntc[0].name;
  } catch (error) {
    console.error('Error naming color:', error);
    return 'Unknown';
  }
}

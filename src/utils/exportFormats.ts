import { toPng } from 'html-to-image';
import type { Color } from '../types';
import { hexToRgb, hexToHsl } from './colorConversion';

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportAsPNG(elementId: string, filename: string = 'palette.png'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  const dataUrl = await toPng(element, {
    cacheBust: true,
    backgroundColor: '#ffffff',
    pixelRatio: 2,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export function exportAsCSS(colors: Color[]): void {
  const cssVariables = colors
    .map((color, index) => `  --color-${index + 1}: ${color.hex}; /* ${color.name} */`)
    .join('\n');

  const cssContent = `:root {\n${cssVariables}\n}`;
  downloadFile(cssContent, 'palette.css', 'text/css');
}

export function exportAsJSON(colors: Color[]): void {
  const jsonData = {
    palette: colors.map((color, index) => {
      const rgb = hexToRgb(color.hex);
      const hsl = hexToHsl(color.hex);
      return {
        id: index + 1,
        hex: color.hex,
        name: color.name,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      };
    }),
    generatedAt: new Date().toISOString(),
  };

  downloadFile(JSON.stringify(jsonData, null, 2), 'palette.json', 'application/json');
}

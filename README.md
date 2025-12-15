# UIfriend - Color Palette Generator

A modern, interactive color palette generator inspired by coolors.co. Built with React, TypeScript, and Tailwind CSS v4.

## Features

- **5-Color Harmonious Palettes**: Generate beautiful, balanced color schemes using color theory
- **Interactive Color Picker**: Click any swatch to open a color picker and customize individual colors
- **One-Click Copy**: Click hex codes to instantly copy them to your clipboard
- **Keyboard Shortcuts**: Press spacebar to generate a new palette
- **Export Options**: Export palettes as PNG, CSS variables, or JSON
- **Responsive Design**: Works seamlessly on all screen sizes
- **Smooth Animations**: Professional 60fps transitions and effects

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Zero-config utility-first CSS
- **Zustand** - Lightweight state management with devtools
- **react-colorful** - Lightweight color picker (2.8 KB)
- **color-namer** - Accurate color naming with Delta-E algorithm
- **html-to-image** - Export palettes as PNG images
- **Playwright** - End-to-end testing

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Usage

### Generate Palettes

- **Spacebar**: Generate a new random palette
- **Generate Button**: Click the generate button in the toolbar

### Customize Colors

1. Click on any color swatch to open the color picker
2. Use the color picker or hex input to select your desired color
3. Press ESC or click outside to close the picker

### Copy Hex Codes

- Click on any hex code to copy it to your clipboard
- A toast notification will confirm the copy

### Export Palettes

1. Click the **Export** button in the toolbar
2. Choose your export format:
   - **PNG**: High-resolution image (2x pixel ratio)
   - **CSS**: CSS variables with color names as comments
   - **JSON**: Full palette data with hex, RGB, HSL, and names

## Project Structure

```
uifriend/
├── src/
│   ├── components/          # React components
│   │   ├── ColorSwatch.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── ExportMenu.tsx
│   │   ├── Toolbar.tsx
│   │   └── Toast.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useClipboard.ts
│   ├── store/              # Zustand state management
│   │   └── paletteStore.ts
│   ├── utils/              # Utility functions
│   │   ├── colorGeneration.ts
│   │   ├── colorNaming.ts
│   │   ├── colorConversion.ts
│   │   └── exportFormats.ts
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/                  # Playwright tests
│   ├── palette-generation.spec.ts
│   ├── color-picker.spec.ts
│   ├── clipboard.spec.ts
│   └── export.spec.ts
├── playwright.config.ts
├── vite.config.ts
└── package.json
```

## Testing

### Run Playwright Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed
```

### Test Coverage

- **Palette Generation**: Verify 5 swatches, color regeneration, spacebar functionality
- **Color Picker**: Open/close behavior, color updates, keyboard shortcuts
- **Clipboard**: Copy functionality, toast notifications
- **Export**: PNG, CSS, and JSON export functionality

## Color Generation Algorithm

UIfriend uses HSL-based color harmony algorithms to generate aesthetically pleasing palettes:

- **Analogous**: Colors adjacent on the color wheel (±30-60°)
- **Complementary**: Opposite colors on the color wheel (180°)
- **Triadic**: Evenly spaced colors (120° apart)
- **Random Harmonious**: Random mix of harmony types

All colors are generated with:
- Saturation: 65-90%
- Lightness: 45-70%

This ensures vibrant, usable colors with good contrast.

## Keyboard Shortcuts

- `Space` - Generate new palette
- `ESC` - Close color picker or modals

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance

- Bundle size: ~150-200 KB (gzipped)
- First Load: < 1s
- 60fps animations using GPU-accelerated CSS transforms

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Automatic text color contrast (white on dark, black on light)
- Focus visible states

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npx playwright test  # Run Playwright tests
```

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Modular component architecture
- Custom hooks for reusable logic

## Future Enhancements

- Lock/unlock individual colors before regenerating
- Save palettes to local storage
- Share palettes via URL
- More harmony types (split-complementary, tetradic)
- Color accessibility checker (WCAG contrast ratios)
- Drag to reorder colors
- Color history

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

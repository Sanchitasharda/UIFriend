import { useState } from 'react';
import { usePaletteStore } from '../store/paletteStore';
import { getTextColor } from '../utils/colorConversion';

type PreviewTab = 'components' | 'typography' | 'blocks';

export function VisualizerPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PreviewTab>('components');
  const colors = usePaletteStore((state) => state.colors);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-40 clay-panel  rounded-full p-4 shadow-2xl transition-transform duration-300 hover:scale-110"
        aria-label="Toggle visualizer"
      >
        <svg className="h-7 w-7 text-[#2D2A26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#2D2A26]/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative clay-panel rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-[#2D2A26]">
                Color Visualizer
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8A8580] hover:text-[#2D2A26] transition-transform hover:scale-110"
                aria-label="Close visualizer"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-gray-100 pb-2">
              <button
                onClick={() => setActiveTab('components')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'components'
                    ? 'clay-panel text-[#E07A5F]'
                    : 'text-[#8A8580] hover:bg-gray-100'
                }`}
              >
                Components
              </button>
              <button
                onClick={() => setActiveTab('typography')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'typography'
                    ? 'clay-panel text-[#E07A5F]'
                    : 'text-[#8A8580] hover:bg-gray-100'
                }`}
              >
                Typography
              </button>
              <button
                onClick={() => setActiveTab('blocks')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'blocks'
                    ? 'clay-panel text-[#E07A5F]'
                    : 'text-[#8A8580] hover:bg-gray-100'
                }`}
              >
                Blocks
              </button>
            </div>

            {/* Tab Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-12rem)]">
              {activeTab === 'components' && <ComponentsPreview colors={colors.map(c => c.hex)} />}
              {activeTab === 'typography' && <TypographyPreview colors={colors.map(c => c.hex)} />}
              {activeTab === 'blocks' && <BlocksPreview colors={colors.map(c => c.hex)} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Components Preview Tab
function ComponentsPreview({ colors }: { colors: string[] }) {
  const [primary, secondary, accent, background, textColor] = colors;

  return (
    <div className="space-y-8">
      {/* Buttons Section */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Buttons</h4>
        <div className="grid grid-cols-3 gap-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: primary, color: getTextColor(primary) }}
          >
            Primary Button
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: secondary, color: getTextColor(secondary) }}
          >
            Secondary
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: accent, color: getTextColor(accent) }}
          >
            Accent
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
            style={{ borderColor: primary, color: primary, backgroundColor: 'transparent' }}
          >
            Outline Primary
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
            style={{ borderColor: secondary, color: secondary, backgroundColor: 'transparent' }}
          >
            Outline Secondary
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
            style={{ borderColor: accent, color: accent, backgroundColor: 'transparent' }}
          >
            Outline Accent
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Cards</h4>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-6 rounded-xl shadow-xl"
            style={{ backgroundColor: background, color: getTextColor(background) }}
          >
            <h5 className="text-xl font-bold mb-2" style={{ color: primary }}>Card Title</h5>
            <p className="text-sm opacity-80 mb-4">
              This is a sample card with background color and primary accent.
            </p>
            <button
              className="px-4 py-2 rounded-lg font-semibold"
              style={{ backgroundColor: primary, color: getTextColor(primary) }}
            >
              Learn More
            </button>
          </div>
          <div
            className="p-6 rounded-xl shadow-xl"
            style={{ backgroundColor: primary, color: getTextColor(primary) }}
          >
            <h5 className="text-xl font-bold mb-2">Inverted Card</h5>
            <p className="text-sm opacity-90 mb-4">
              This card uses the primary color as background.
            </p>
            <button
              className="px-4 py-2 rounded-lg font-semibold"
              style={{ backgroundColor: background, color: getTextColor(background) }}
            >
              Action
            </button>
          </div>
        </div>
      </div>

      {/* Form Inputs Section */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Form Inputs</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#2D2A26] mb-2">Text Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: primary }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2D2A26] mb-2">Select</label>
            <select
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: secondary }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Badges</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: color, color: getTextColor(color) }}
            >
              Badge {idx + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Alerts</h4>
        <div className="space-y-3">
          <div
            className="p-4 rounded-lg border-l-4"
            style={{ borderColor: primary, backgroundColor: `${primary}15` }}
          >
            <p className="font-semibold" style={{ color: primary }}>Information Alert</p>
            <p className="text-sm text-[#8A8580]">This is an informational message using the primary color.</p>
          </div>
          <div
            className="p-4 rounded-lg border-l-4"
            style={{ borderColor: accent, backgroundColor: `${accent}15` }}
          >
            <p className="font-semibold" style={{ color: accent }}>Success Alert</p>
            <p className="text-sm text-[#8A8580]">This is a success message using the accent color.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Typography Preview Tab
function TypographyPreview({ colors }: { colors: string[] }) {
  const [primary, secondary, accent, , textDark] = colors;

  return (
    <div className="space-y-8">
      {/* Headings */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Headings</h4>
        <h1 className="text-5xl font-extrabold mb-3" style={{ color: primary }}>
          Heading 1
        </h1>
        <h2 className="text-4xl font-bold mb-3" style={{ color: secondary }}>
          Heading 2
        </h2>
        <h3 className="text-3xl font-bold mb-3" style={{ color: accent }}>
          Heading 3
        </h3>
        <h4 className="text-2xl font-semibold mb-3" style={{ color: primary }}>
          Heading 4
        </h4>
        <h5 className="text-xl font-semibold mb-3" style={{ color: secondary }}>
          Heading 5
        </h5>
        <h6 className="text-lg font-semibold" style={{ color: accent }}>
          Heading 6
        </h6>
      </div>

      {/* Body Text */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Body Text</h4>
        <p className="text-base mb-3" style={{ color: textDark }}>
          This is regular body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-base opacity-75 mb-3" style={{ color: textDark }}>
          This is body text with 75% opacity for secondary content.
        </p>
        <p className="text-sm opacity-60" style={{ color: textDark }}>
          This is small text with 60% opacity for tertiary content.
        </p>
      </div>

      {/* Links */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Links</h4>
        <div className="space-y-2">
          <p>
            <a href="#" className="font-semibold underline" style={{ color: primary }}>
              Primary Link
            </a>
          </p>
          <p>
            <a href="#" className="font-semibold underline" style={{ color: secondary }}>
              Secondary Link
            </a>
          </p>
          <p>
            <a href="#" className="font-semibold underline" style={{ color: accent }}>
              Accent Link
            </a>
          </p>
        </div>
      </div>

      {/* Color Combinations */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Color Combinations</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-xl" style={{ backgroundColor: primary }}>
            <h5 className="text-2xl font-bold mb-2" style={{ color: getTextColor(primary) }}>
              Primary Background
            </h5>
            <p className="opacity-90" style={{ color: getTextColor(primary) }}>
              Text content on primary background with automatic contrast.
            </p>
          </div>
          <div className="p-6 rounded-xl" style={{ backgroundColor: secondary }}>
            <h5 className="text-2xl font-bold mb-2" style={{ color: getTextColor(secondary) }}>
              Secondary Background
            </h5>
            <p className="opacity-90" style={{ color: getTextColor(secondary) }}>
              Text content on secondary background with automatic contrast.
            </p>
          </div>
          <div className="p-6 rounded-xl" style={{ backgroundColor: accent }}>
            <h5 className="text-2xl font-bold mb-2" style={{ color: getTextColor(accent) }}>
              Accent Background
            </h5>
            <p className="opacity-90" style={{ color: getTextColor(accent) }}>
              Text content on accent background with automatic contrast.
            </p>
          </div>
          <div className="p-6 rounded-xl" style={{ backgroundColor: textDark }}>
            <h5 className="text-2xl font-bold mb-2" style={{ color: getTextColor(textDark) }}>
              Dark Background
            </h5>
            <p className="opacity-90" style={{ color: getTextColor(textDark) }}>
              Text content on dark background with automatic contrast.
            </p>
          </div>
        </div>
      </div>

      {/* Blockquote */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Blockquote</h4>
        <blockquote
          className="border-l-4 pl-6 py-4 italic text-lg"
          style={{ borderColor: accent, color: textDark }}
        >
          "Design is not just what it looks like and feels like. Design is how it works."
          <footer className="mt-2 text-sm font-semibold not-italic" style={{ color: accent }}>
            — Steve Jobs
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

// Blocks Preview Tab
function BlocksPreview({ colors }: { colors: string[] }) {
  return (
    <div className="space-y-8">
      {/* Full-Width Color Blocks (like coolors.co) */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Color Blocks</h4>
        <div className="flex h-32 rounded-xl overflow-hidden shadow-2xl">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="flex-1 flex items-end justify-center p-4 transition-all hover:flex-[1.2] cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <div className="text-center">
                <p className="font-bold text-sm mb-1" style={{ color: getTextColor(color) }}>
                  {color}
                </p>
                <p className="text-xs opacity-75" style={{ color: getTextColor(color) }}>
                  Color {idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid View */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Grid Layout</h4>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl shadow-lg flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            >
              <span className="font-bold text-lg" style={{ color: getTextColor(color) }}>
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Previews */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Gradients</h4>
        <div className="space-y-4">
          {/* Linear Gradients */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="h-32 rounded-xl shadow-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
              }}
            >
              <p className="font-bold text-white text-sm  px-4 py-2 rounded-lg">
                Linear Gradient 1-2
              </p>
            </div>
            <div
              className="h-32 rounded-xl shadow-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(to right, ${colors[2]}, ${colors[3]})`,
              }}
            >
              <p className="font-bold text-white text-sm  px-4 py-2 rounded-lg">
                Linear Gradient 3-4
              </p>
            </div>
          </div>

          {/* Multi-color Gradient */}
          <div
            className="h-32 rounded-xl shadow-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(to right, ${colors.join(', ')})`,
            }}
          >
            <p className="font-bold text-white text-lg  px-6 py-3 rounded-lg">
              Full Palette Gradient
            </p>
          </div>

          {/* Radial Gradient */}
          <div
            className="h-32 rounded-xl shadow-lg flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${colors[0]}, ${colors[4]})`,
            }}
          >
            <p className="font-bold text-white text-sm  px-4 py-2 rounded-lg">
              Radial Gradient
            </p>
          </div>
        </div>
      </div>

      {/* Overlay Examples */}
      <div>
        <h4 className="text-lg font-bold text-[#2D2A26] mb-4">Overlay Effects</h4>
        <div className="grid grid-cols-3 gap-4">
          {colors.slice(0, 3).map((color, idx) => (
            <div
              key={idx}
              className="relative h-32 rounded-xl overflow-hidden shadow-lg"
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <p className="font-bold text-white">20% Black</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

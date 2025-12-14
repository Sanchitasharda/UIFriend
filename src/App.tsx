import { useEffect } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { usePaletteStore } from './store/paletteStore';
import { DraggableColorSwatch } from './components/DraggableColorSwatch';
import { ColorPicker } from './components/ColorPicker';
import { Toolbar } from './components/Toolbar';
import { Toast } from './components/Toast';
import { HistoryPanel } from './components/HistoryPanel';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { VisualizerPanel } from './components/VisualizerPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { decodeColorsFromURL } from './utils/urlSharing';

function App() {
  const colors = usePaletteStore((state) => state.colors);
  const activeColorIndex = usePaletteStore((state) => state.activeColorIndex);
  const setActiveColorIndex = usePaletteStore((state) => state.setActiveColorIndex);
  const updateColor = usePaletteStore((state) => state.updateColor);
  const addToast = usePaletteStore((state) => state.addToast);
  const reorderColors = usePaletteStore((state) => state.reorderColors);

  useKeyboardShortcuts();

  useEffect(() => {
    const urlColors = decodeColorsFromURL();
    if (urlColors) {
      urlColors.forEach((color, index) => {
        updateColor(index, color.hex);
      });
      addToast('Palette loaded from URL', 'success');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [updateColor, addToast]);

  const handleColorClick = (index: number) => {
    setActiveColorIndex(index);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = colors.findIndex((c, i) => c.hex + i === active.id);
    const newIndex = colors.findIndex((c, i) => c.hex + i === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderColors(oldIndex, newIndex);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#FDFBF7] text-[#2D2A26]">
      <Toolbar />

      <main className="h-full pt-40 pb-12 px-8 md:px-16">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={colors.map((c, i) => c.hex + i)} strategy={horizontalListSortingStrategy}>
            <div id="palette-container" className="flex h-full w-full gap-4 md:gap-8 items-center justify-center">
              {colors.map((color, index) => (
                <DraggableColorSwatch
                  key={color.hex + index}
                  color={color}
                  index={index}
                  onColorClick={handleColorClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>

      <ColorPicker
        isOpen={activeColorIndex !== null}
        colorIndex={activeColorIndex ?? 0}
      />

      <Toast />
      <HistoryPanel />
      <AccessibilityPanel />
      <VisualizerPanel />
    </div>
  );
}

export default App;

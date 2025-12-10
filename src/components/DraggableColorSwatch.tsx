import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColorSwatch } from './ColorSwatch';
import type { Color } from '../types';

interface DraggableColorSwatchProps {
  color: Color;
  index: number;
  onColorClick: (index: number) => void;
}

export function DraggableColorSwatch({ color, index, onColorClick }: DraggableColorSwatchProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: color.hex + index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-[60vh] w-full max-w-[240px] flex-shrink-0"
      {...attributes}
    >
      <ColorSwatch color={color} index={index} onColorClick={onColorClick} dragHandle={listeners} />
    </div>
  );
}

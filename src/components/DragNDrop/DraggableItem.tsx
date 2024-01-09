import { ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";

interface DraggableItemProps {
  id: string;
  index: number;
  children: ReactNode;
}

export function DraggableItem({ id, index, children }: DraggableItemProps): JSX.Element {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

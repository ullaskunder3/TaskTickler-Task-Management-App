import { ReactNode } from "react";
import { Droppable } from "react-beautiful-dnd";

interface DroppableContainerProps {
  droppableId: string;
  children: ReactNode;
}

export function DroppableContainer({ droppableId, children }: DroppableContainerProps): JSX.Element {
  return (
    <Droppable droppableId={droppableId} type="group">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

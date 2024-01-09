import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ReactNode } from "react";

interface DragDropContextWrapperProps {
  onDragEnd: (results: DropResult) => void;
  children: ReactNode;
}

export function DragDropContextWrapper({ onDragEnd, children }: DragDropContextWrapperProps): JSX.Element {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
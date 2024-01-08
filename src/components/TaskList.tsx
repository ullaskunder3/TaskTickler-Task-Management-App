// components/TaskList.tsx
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'; // Import Draggable and DraggableProvided
import { StrictModeDroppable as Droppable } from '@helpers/StrictModeDroppable';
import { useTaskContext } from '../context/TaskContext';
import Task from './Task';

interface TaskListProps {
  title: 'Added' | 'Started' | 'Completed';
}

const TaskList: React.FC<TaskListProps> = ({ title }) => {
  const { tasks } = useTaskContext();

  return (
    <div
      style={{
        border: '2px dashed black',
        padding: '16px',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        margin: '8px',
        flex: '1',
        maxWidth: '300px',
      }}
    >
      <h2>{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks
              .filter((task) => task.status === title)
              .map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided: DraggableProvided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <Task task={task} provided={provided} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;

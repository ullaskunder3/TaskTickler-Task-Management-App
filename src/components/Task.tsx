// Task.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@_types/task'; // Define ItemTypes if not already defined
import { Task as tyTask } from '@_types/task';

interface TaskProps {
  task: tyTask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '8px',
        margin: '8px',
        backgroundColor: '#fff',
        borderRadius: '4px',
      }}
    >
      <strong>{task.title}</strong> - Priority: {task.priority}
    </div>
  );
};

export default Task;

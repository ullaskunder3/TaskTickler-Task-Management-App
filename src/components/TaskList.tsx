// TaskList.tsx
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@_types/task'; // Define ItemTypes if not already defined
import { Task } from '@_types/task';
import TaskComponent from './Task';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onTaskMove: (taskId: number, status: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onTaskMove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: number }) => onTaskMove(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: `2px dashed ${isOver ? 'red' : 'black'}`,
        padding: '16px',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        margin: '8px',
      }}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

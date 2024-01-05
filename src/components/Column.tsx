// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Column.tsx
import React from 'react';
import TaskList from './TaskList';

interface ColumnProps {
  title: string;
  tasks: unknown;
  priority: 'high' | 'medium' | 'low';
  moveTask: (taskId: number, targetPriority: 'high' | 'medium' | 'low') => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, priority, moveTask }) => {
  const columnTasks = tasks.filter((task) => task.priority === priority);

  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      <TaskList tasks={columnTasks} moveTask={moveTask} />
    </div>
  );
};

export default Column;

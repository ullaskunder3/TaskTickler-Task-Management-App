// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// App.tsx
// App.tsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskMove = (taskId: number, status: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList title="Added" tasks={tasks.filter((task) => task.status === 'Added')} onTaskMove={handleTaskMove} />
        <TaskList title="Started" tasks={tasks.filter((task) => task.status === 'Started')} onTaskMove={handleTaskMove} />
        <TaskList title="Completed" tasks={tasks.filter((task) => task.status === 'Completed')} onTaskMove={handleTaskMove} />
      </div>
    </DndProvider>
  );
};

export default App;


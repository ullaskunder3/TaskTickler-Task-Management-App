// App.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', flexDirection:"column" }}>
          <TaskForm />
          <div style={{display: "flex", justifyContent: "center"}}>
          <TaskList title="Added" />
          <TaskList title="Started" />
          <TaskList title="Completed" />
          </div>
        </div>
      </DndProvider>
    </TaskProvider>
  );
};

export default App;

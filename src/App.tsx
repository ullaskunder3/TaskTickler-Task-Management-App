import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <TaskProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TaskForm />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TaskList title="Added" />
            <TaskList title="Started" />
            <TaskList title="Completed" />
          </div>
        </div>
      </DragDropContext>
    </TaskProvider>
  );
};

export default App;

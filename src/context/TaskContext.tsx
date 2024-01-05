// context/TaskContext.tsx
import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { Task, TaskAction } from '@_types/task';

interface TaskContextProps {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

interface TaskProviderProps {
  children: ReactNode;
}

const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...tasks, action.payload];
    case 'UPDATE_TASK':
      return tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.updatedTask } : task
      );
    case 'DELETE_TASK':
      return tasks.filter((task) => task.id !== action.payload);
    default:
      return tasks;
  }
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};

const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTaskContext };

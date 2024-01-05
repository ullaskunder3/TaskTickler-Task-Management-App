// types/task.ts
export type Task = {
    id: number;
    title: string;
    priority: 'high' | 'medium' | 'low';
    status: 'Added' | 'Started' | 'Completed';
  };
  export const ItemTypes = {
    TASK: 'task',
  };
  
  export type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: { id: number; updatedTask: Partial<Task> } }
    | { type: 'DELETE_TASK'; payload: number };
  
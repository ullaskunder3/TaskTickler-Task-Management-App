// types.ts
export type Task = {
    id: number;
    title: string;
    priority: 'high' | 'medium' | 'low';
    status: 'Added' | 'Started' | 'Completed';
  };
  
  // constants.ts
export const ItemTypes = {
    TASK: 'task',
  };
  
// types.ts

export interface Task {
  id: string;
  Task: string;
  Due_Date: string;
  // Add other task properties as needed
}

export interface KanbanColumn {
  title: string;
  items: Task[];
}

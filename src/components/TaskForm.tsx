// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TaskForm.tsx
// TaskForm.tsx
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleAddTask = () => {
    if (title) {
      const newTask: Task = {
        id: Date.now(),
        title,
        priority,
        status: 'Added',
      };
      onAddTask(newTask);
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;

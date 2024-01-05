// components/TaskForm.tsx
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '@_types/task';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const { dispatch } = useTaskContext();

  const handleAddTask = () => {
    if (title) {
      const newTask: Task = {
        id: Date.now(),
        title,
        priority,
        status: 'Added',
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
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

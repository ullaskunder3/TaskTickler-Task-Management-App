// TaskModal.tsx
import React, { useState } from 'react';
import { Task as tyTask } from '@_types/task';

interface TaskModalProps {
  task: tyTask;
  onUpdateTask: (updatedTask: tyTask) => void;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onUpdateTask, onClose }) => {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedPriority, setUpdatedPriority] = useState(task.priority);

  const handleUpdateTask = () => {
    onUpdateTask({ ...task, title: updatedTitle, priority: updatedPriority });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', color: 'black', padding: '16px', borderRadius: '8px' }}>
        <h2>{task.title}</h2>
        <p>Priority: {task.priority}</p>
        <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
        <select value={updatedPriority} onChange={(e) => setUpdatedPriority(e.target.value as 'high' | 'medium' | 'low')}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleUpdateTask}>Update Task</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;

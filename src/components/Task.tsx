// components/Task.tsx
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Task as tyTask } from '@_types/task';
import TaskModal from './TaskModal';

interface TaskProps {
  task: tyTask;
  provided: DraggableProvided;
}

const Task: React.FC<TaskProps> = ({ task, provided }) => {
  const { dispatch } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickOpen = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Partial<tyTask>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: task.id, updatedTask } });
    closeModal();
  };

  return (
    <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      cursor: 'move',
      border: '1px solid #ccc',
      padding: '8px',
      margin: '8px',
      backgroundColor: '#555',
      borderRadius: '4px',
      height: "7rem",
      overflow: "auto"
    }}
    >
      <div onClick={onClickOpen} style={{ cursor: 'pointer' }}>
        <strong>{task.title}</strong> - Priority: {task.priority}
      </div>
      {isModalOpen && <TaskModal task={task} onUpdateTask={handleUpdateTask} onClose={closeModal} />}
    </div>
  );
};

export default Task;

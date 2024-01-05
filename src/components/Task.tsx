// Task.tsx
import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useTaskContext } from '../context/TaskContext';
import { ItemTypes } from '@_types/task';
import { Task as tyTask } from '@_types/task';
import TaskModal from './TaskModal';

interface TaskProps {
  task: tyTask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const { dispatch, tasks } = useTaskContext();
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

  useEffect(() => {
    console.log('Updated tasks:', tasks);
  }, [tasks]);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '8px',
        margin: '8px',
        backgroundColor: isDragging ? '#555' : '#ff3c3c',
        borderRadius: '4px',
        height: "7rem",
        overflow: "auto"
      }}
    >
      <div onClick={onClickOpen} style={{ cursor: 'pointer' }}>
        <strong>{task.title}</strong> - Priority: {task.priority}
      </div>
      {isModalOpen && (
        <TaskModal task={task} onUpdateTask={handleUpdateTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default Task;


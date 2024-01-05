// components/TaskList.tsx
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@_types/task';
import { useTaskContext } from '../context/TaskContext';
import Task from './Task';

interface TaskListProps {
  title: 'Added' | 'Started' | 'Completed'; // Ensure title is one of the allowed statuses
}

const TaskList: React.FC<TaskListProps> = ({ title }) => {
  const { tasks, dispatch } = useTaskContext();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: number }) => {
      dispatch({ type: 'UPDATE_TASK', payload: { id: item.id, updatedTask: { status: title } } });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: `2px dashed ${isOver ? 'red' : 'black'}`,
        padding: '16px',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        margin: '8px',
        flex: "1",
        maxWidth: "300px"
      }}
    >
      <h2>{title}</h2>
      {tasks
        .filter((task) => task.status === title)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskList;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// TaskItem.js
import { useDrag } from 'react-dnd';

const TaskItem = ({ task }) => {
  const [, drag] = useDrag({
    item: { type: 'TASK', id: task.id },
  });

  return (
    <div
      ref={drag}
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        margin: '8px',
        backgroundColor: '#fff',
      }}
    >
      <div>{task.title}</div>
      <div>Priority: {task.priority}</div>
    </div>
  );
};

export default TaskItem;

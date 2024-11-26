import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoggedIn,
  loading,
  error,
  onTaskUpdate,
}) => {
  if (loading) return <div className="loading">Загрузка заданий...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!tasks || tasks.length === 0) return <div className="no-tasks">Нет заданий</div>;

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isLoggedIn={isLoggedIn}
          onUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;

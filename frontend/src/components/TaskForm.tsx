import React from 'react';

interface TaskFormProps {
  newTask: {
    username: string;
    email: string;
    text: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (task: { username: string; email: string; text: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ newTask, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        type="text"
        placeholder="Username"
        value={newTask.username}
        onChange={(e) => onChange({ ...newTask, username: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={newTask.email}
        onChange={(e) => onChange({ ...newTask, email: e.target.value })}
        required
      />
      <textarea
        placeholder="Task text"
        value={newTask.text}
        onChange={(e) => onChange({ ...newTask, text: e.target.value })}
        required
      />
      <button type="submit">Добавить Задание</button>
    </form>
  );
};

export default TaskForm;

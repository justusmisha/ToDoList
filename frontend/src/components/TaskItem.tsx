import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  isLoggedIn: boolean;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isLoggedIn, onUpdate }) => {
  const [editingText, setEditingText] = useState<string | null>(null);

  const handleEdit = () => {
    setEditingText(task.text);
  };

  const handleSave = async () => {
    if (editingText !== null) {
      await onUpdate(task.id, { 
        text: editingText,
        edited_by_admin: true 
      });
      setEditingText(null);
    }
  };

  const handleCancel = () => {
    setEditingText(null);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.username}</h3>
      <p className="email">{task.email}</p>
      {isLoggedIn ? (
        <div className="task-edit">
          <textarea
            className="task-text"
            value={editingText !== null ? editingText : task.text}
            onChange={(e) => setEditingText(e.target.value)}
            onFocus={() => editingText === null && handleEdit()}
          />
          {editingText !== null && (
            <div className="edit-buttons">
              <button className="save-button" onClick={handleSave}>
                Сохранить
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Отмена
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="description">
          {task.text}
          {task.edited_by_admin && <span className="edited-by-admin"> (Отредактировано администратором)</span>}
        </p>
      )}
      <div className="task-footer">
        <p className="status">
          Статус: {task.completed ? '✓ Выполнено' : 'В процессе'}
        </p>
        {isLoggedIn && (
          <button
            className="toggle-status"
            onClick={() => onUpdate(task.id, { completed: !task.completed })}
          >
            {task.completed ? 'В процессе' : 'Сделана'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;

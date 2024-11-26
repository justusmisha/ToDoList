import React, { useEffect, useState, useCallback } from 'react';
import { api } from './api/api';
import { Task, TaskResponse } from './types';
import './App.css';

// Import components
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import TaskForm from './components/TaskForm';
import SortControls from './components/SortControls';
import TaskList from './components/TaskList';
import Pagination from './components/Pagination';

function App() {
  const [taskData, setTaskData] = useState<TaskResponse>({
    tasks: [],
    total: 0,
    pages: 0,
    current_page: 1,
    per_page: 3
  });

  const [newTask, setNewTask] = useState({ username: '', email: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const fetchTasks = useCallback(async (page = 1) => {
    try {
      const data = await api.get(`/api/tasks?page=${page}&sort_by=${sortBy}&order=${order}`);
      setTaskData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Ошибка в получении заданий');
      setLoading(false);
    }
  }, [sortBy, order]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/tasks', newTask);
      setNewTask({ username: '', email: '', text: '' });
      await fetchTasks(1);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Ошибка при создании задания');
    }
  };

  const handleTaskUpdate = async (taskId: number, updates: Partial<Task>) => {
    try {
      await api.put(`/api/tasks/${taskId}`, updates);
      fetchTasks(taskData.current_page);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Ошибка при обновлении задания');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.username !== 'admin' || loginData.password !== '123') {
      alert('Invalid credentials.');
      return;
    }

    setIsLoggedIn(true);
    setShowLoginModal(false);
    setLoginData({ username: '', password: '' });
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setOrder('desc');
    }
  };

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setShowLoginModal(true)} 
      />

      <LoginModal
        show={showLoginModal}
        loginData={loginData}
        onSubmit={handleLogin}
        onChange={setLoginData}
        onClose={() => {
          setShowLoginModal(false);
          setLoginData({ username: '', password: '' });
        }}
      />

      <main>
        <TaskForm
          newTask={newTask}
          onSubmit={handleSubmit}
          onChange={setNewTask}
        />

        <SortControls
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
        />

        <TaskList
          tasks={taskData.tasks}
          isLoggedIn={isLoggedIn}
          loading={loading}
          error={error}
          onTaskUpdate={handleTaskUpdate}
        />

        <Pagination
          currentPage={taskData.current_page}
          totalPages={taskData.pages}
          onPageChange={fetchTasks}
        />
      </main>
    </div>
  );
}

export default App;

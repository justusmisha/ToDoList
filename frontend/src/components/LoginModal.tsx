import React from 'react';
import { LoginData } from '../types';

interface LoginModalProps {
  show: boolean;
  loginData: LoginData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: LoginData) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  loginData,
  onSubmit,
  onChange,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Log In</h2>
        <form onSubmit={onSubmit}>
          <div className="modal-input">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              value={loginData.username}
              onChange={(e) => onChange({ ...loginData, username: e.target.value })}
              required
            />
          </div>
          <div className="modal-input">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => onChange({ ...loginData, password: e.target.value })}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Войти</button>
            <button 
              type="button" 
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

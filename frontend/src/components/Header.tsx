import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick }) => {
  return (
    <header className="App-header">
      <h1>ToDo List for BeeJee</h1>
      <button 
        className="login-button" 
        onClick={onLoginClick}
      >
        {isLoggedIn ? 'Вы зашли как Админ' : 'Log In'}
      </button>
    </header>
  );
};

export default Header;

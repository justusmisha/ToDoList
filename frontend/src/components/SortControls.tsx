import React from 'react';

interface SortControlsProps {
  sortBy: string;
  order: string;
  onSort: (column: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, order, onSort }) => {
  return (
    <div className="sort-controls">
      <button onClick={() => onSort('username')}>
        Сортировать по имени {sortBy === 'username' && (order === 'desc' ? '↓' : '↑')}
      </button>
      <button onClick={() => onSort('email')}>
        Сортировать по Email {sortBy === 'email' && (order === 'desc' ? '↓' : '↑')}
      </button>
      <button onClick={() => onSort('created_at')}>
        Сортировать по дате {sortBy === 'created_at' && (order === 'desc' ? '↓' : '↑')}
      </button>
      <button onClick={() => onSort('completed')}>
        Сортировать по статусу {sortBy === 'completed' && (order === 'desc' ? '↓' : '↑')}
      </button>
    </div>
  );
};

export default SortControls;

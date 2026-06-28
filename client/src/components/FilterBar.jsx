import { useEffect } from 'react';
import styles from './FilterBar.module.css';

const STATUS_OPTIONS = [
  { label: 'ALL', value: 'all' },
  { label: 'TODO', value: 'todo' },
  { label: 'IN PROGRESS', value: 'in-progress' },
  { label: 'DONE', value: 'done' },
];

const PRIORITY_OPTIONS = [
  { label: 'ALL', value: 'all' },
  { label: 'LOW', value: 'low' },
  { label: 'MEDIUM', value: 'medium' },
  { label: 'HIGH', value: 'high' },
];

const SORT_OPTIONS = [
  { label: 'CREATED DATE', value: 'createdAt' },
  { label: 'DUE DATE', value: 'dueDate' },
];

const STORAGE_KEY = 'taskflow_filters';

const FilterBar = ({ filters, onFilterChange }) => {
  // Persist filters to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const handleStatus = (value) => onFilterChange({ ...filters, status: value });
  const handlePriority = (value) => onFilterChange({ ...filters, priority: value });
  const handleSort = (value) => onFilterChange({ ...filters, sort: value });

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <span className={styles.label}>STATUS:</span>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            id={`filter-status-${opt.value}`}
            className={`${styles.tag} ${filters.status === opt.value ? styles.active : ''}`}
            onClick={() => handleStatus(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className={styles.group}>
        <span className={styles.label}>PRIORITY:</span>
        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            id={`filter-priority-${opt.value}`}
            className={`${styles.tag} ${filters.priority === opt.value ? styles.active : ''}`}
            onClick={() => handlePriority(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className={styles.group}>
        <span className={styles.label}>SORT:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            id={`sort-${opt.value}`}
            className={`${styles.tag} ${filters.sort === opt.value ? styles.active : ''}`}
            onClick={() => handleSort(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;

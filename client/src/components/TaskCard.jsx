import { format, isPast, isToday } from 'date-fns';
import styles from './TaskCard.module.css';

const STATUS_LABELS = {
  todo: 'TODO',
  'in-progress': 'IN PROGRESS',
  done: 'DONE',
};

const PRIORITY_LABELS = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
};

const truncate = (str, max) =>
  str && str.length > max ? str.slice(0, max) + '…' : str;

const TaskCard = ({ task, onEdit, onDelete, onMarkDone }) => {
  const isOverdue =
    task.dueDate &&
    task.status !== 'done' &&
    (isPast(new Date(task.dueDate)) || isToday(new Date(task.dueDate)));

  const formattedDue = task.dueDate
    ? format(new Date(task.dueDate), 'MMM dd, yyyy')
    : null;

  return (
    <article className={styles.card}>
      {/* Badges Row */}
      <div className={styles.badges}>
        <span className={`${styles.badge} ${styles[`status_${task.status.replace('-', '_')}`]}`}>
          {STATUS_LABELS[task.status]}
        </span>
        <span className={`${styles.badge} ${styles[`priority_${task.priority}`]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      {/* Title */}
      <h3 className={styles.title}>{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className={styles.description}>{truncate(task.description, 80)}</p>
      )}

      {/* Due Date */}
      {formattedDue && (
        <p className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
          DUE: {formattedDue}
          {isOverdue && ' ⚠'}
        </p>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {task.status !== 'done' && (
          <button
            id={`mark-done-${task._id}`}
            className={styles.btnMarkDone}
            onClick={() => onMarkDone(task)}
          >
            MARK DONE
          </button>
        )}
        <button
          id={`edit-${task._id}`}
          className={styles.btnEdit}
          onClick={() => onEdit(task)}
        >
          EDIT
        </button>
        <button
          id={`delete-${task._id}`}
          className={styles.btnDelete}
          onClick={() => {
            if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
              onDelete(task._id);
            }
          }}
        >
          DELETE
        </button>
      </div>
    </article>
  );
};

export default TaskCard;

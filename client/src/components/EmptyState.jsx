import styles from './EmptyState.module.css';

const EmptyState = ({ onAddTask }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>NO TASKS HERE. ADD ONE TO GET STARTED.</p>
      <button id="empty-state-add-btn" className={styles.button} onClick={onAddTask}>
        + NEW TASK
      </button>
    </div>
  );
};

export default EmptyState;

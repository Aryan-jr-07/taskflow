import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, loading, onEdit, onDelete, onMarkDone, onAddTask }) => {
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>LOADING TASKS...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkDone={onMarkDone}
        />
      ))}
    </div>
  );
};

export default TaskList;

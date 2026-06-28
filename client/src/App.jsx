import { useState, useEffect, useCallback, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useTasks from './hooks/useTasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

const STORAGE_KEY = 'taskflow_filters';

const loadSavedFilters = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : { status: 'all', priority: 'all', sort: 'createdAt' };
  } catch {
    return { status: 'all', priority: 'all', sort: 'createdAt' };
  }
};

const App = () => {
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask, filterTasks } =
    useTasks();

  const [filters, setFilters] = useState(loadSavedFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // null = create mode
  const [submitting, setSubmitting] = useState(false);

  // Initial fetch + re-fetch when sort changes (sort is server-side)
  useEffect(() => {
    fetchTasks({ sort: filters.sort });
  }, [filters.sort, fetchTasks]);

  // Keyboard shortcut: press "N" to open new task modal
  useEffect(() => {
    const handleKey = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (
        e.key === 'n' &&
        !isModalOpen &&
        tag !== 'input' &&
        tag !== 'textarea' &&
        tag !== 'select'
      ) {
        openCreateModal();
      }
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        toast.success('Task updated!');
      } else {
        await createTask(formData);
        toast.success('Task created!');
      }
      closeModal();
    } catch (err) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted!');
    } catch {
      toast.error('Something went wrong. Try again.');
    }
  };

  const handleMarkDone = async (task) => {
    try {
      await updateTask(task._id, { ...task, status: 'done' });
      toast.success('Task marked as done!');
    } catch {
      toast.error('Something went wrong. Try again.');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Client-side filtering (status + priority); sort is handled server-side on fetch
  const displayedTasks = useMemo(() => {
    return filterTasks(tasks, {
      status: filters.status,
      priority: filters.priority,
    });
  }, [tasks, filters.status, filters.priority, filterTasks]);

  // Task count summary
  const summary = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    return { total, done, inProgress, todo };
  }, [tasks]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'IBM Plex Mono, monospace',
            border: '2px solid #000',
            borderRadius: '0',
            boxShadow: '4px 4px 0px #000',
            fontSize: '0.85rem',
            fontWeight: '700',
          },
          success: { iconTheme: { primary: '#00cc44', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ff0000', secondary: '#fff' } },
        }}
      />

      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className={styles.navbar}>
        <h1 className={styles.logo}>TASKFLOW</h1>
        <div className={styles.navRight}>
          <span className={styles.shortcutHint}>Press N for new task</span>
          <button
            id="new-task-btn"
            className={styles.btnNew}
            onClick={openCreateModal}
          >
            + NEW TASK
          </button>
        </div>
      </header>

      {/* ── Summary Bar ────────────────────────────────────── */}
      <div className={styles.summaryBar}>
        <span className={styles.summaryText}>
          {summary.total} TASK{summary.total !== 1 ? 'S' : ''} —{' '}
          {summary.done} DONE, {summary.inProgress} IN PROGRESS, {summary.todo} TODO
        </span>
      </div>

      {/* ── Main Content ───────────────────────────────────── */}
      <main className={styles.main}>
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        <TaskList
          tasks={displayedTasks}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onMarkDone={handleMarkDone}
          onAddTask={openCreateModal}
        />
      </main>

      {/* ── Modal ──────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className={styles.overlay}
          onClick={(e) => {
            if (e.target.id === 'modal-overlay') closeModal();
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <TaskForm
              task={editingTask}
              onSubmit={handleSubmit}
              onCancel={closeModal}
              isLoading={submitting}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;

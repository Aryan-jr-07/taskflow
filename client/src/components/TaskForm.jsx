import { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';

const INITIAL_FORM = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

const TaskForm = ({ task, onSubmit, onCancel, isLoading }) => {
  const isEdit = Boolean(task);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Pre-fill form when editing
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (form.title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate || null,
    };
    onSubmit(payload);
  };

  return (
    <form id="task-form" className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>{isEdit ? 'EDIT TASK' : 'NEW TASK'}</h2>

      {/* Title */}
      <div className={styles.field}>
        <label htmlFor="field-title" className={styles.label}>
          TITLE *
        </label>
        <input
          id="field-title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="Task title..."
          maxLength={100}
        />
        {errors.title && (
          <span className={styles.error}>⚠ {errors.title}</span>
        )}
        <span className={styles.charCount}>{form.title.length}/100</span>
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label htmlFor="field-description" className={styles.label}>
          DESCRIPTION
        </label>
        <textarea
          id="field-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Optional description..."
          rows={4}
          maxLength={500}
        />
      </div>

      {/* Status + Priority Row */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="field-status" className={styles.label}>
            STATUS
          </label>
          <select
            id="field-status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="todo">TODO</option>
            <option value="in-progress">IN PROGRESS</option>
            <option value="done">DONE</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="field-priority" className={styles.label}>
            PRIORITY
          </label>
          <select
            id="field-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="low">LOW</option>
            <option value="medium">MEDIUM</option>
            <option value="high">HIGH</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div className={styles.field}>
        <label htmlFor="field-dueDate" className={styles.label}>
          DUE DATE
        </label>
        <input
          id="field-dueDate"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      {/* Form Actions */}
      <div className={styles.formActions}>
        <button
          id="form-submit-btn"
          type="submit"
          className={styles.btnSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'SAVING...' : isEdit ? 'UPDATE TASK' : 'CREATE TASK'}
        </button>
        <button
          id="form-cancel-btn"
          type="button"
          className={styles.btnCancel}
          onClick={onCancel}
          disabled={isLoading}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

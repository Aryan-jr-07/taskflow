import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks (with optional filter/sort params)
  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/tasks`, { params });
      setTasks(res.data.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch tasks';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new task
  const createTask = useCallback(async (taskData) => {
    const res = await axios.post(`${API_URL}/tasks`, taskData);
    setTasks((prev) => [res.data.data, ...prev]);
    return res.data.data;
  }, []);

  // Update an existing task by id
  const updateTask = useCallback(async (id, taskData) => {
    const res = await axios.put(`${API_URL}/tasks/${id}`, taskData);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? res.data.data : t))
    );
    return res.data.data;
  }, []);

  // Delete a task by id
  const deleteTask = useCallback(async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }, []);

  // Client-side filter — applied on top of the tasks array in state
  const filterTasks = useCallback(
    (allTasks, { status, priority }) => {
      return allTasks.filter((t) => {
        const statusMatch = !status || status === 'all' || t.status === status;
        const priorityMatch =
          !priority || priority === 'all' || t.priority === priority;
        return statusMatch && priorityMatch;
      });
    },
    []
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    filterTasks,
  };
};

export default useTasks;

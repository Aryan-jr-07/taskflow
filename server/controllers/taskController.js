const Task = require('../models/Task');

// GET /api/tasks
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, sort } = req.query;

    const filter = {};
    if (status && ['todo', 'in-progress', 'done'].includes(status)) {
      filter.status = status;
    }
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      filter.priority = priority;
    }

    const sortField = sort === 'dueDate' ? { dueDate: 1 } : { createdAt: -1 };

    const tasks = await Task.find(filter).sort(sortField);

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate: dueDate || null,
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      const castErr = new Error('Invalid task ID');
      castErr.status = 400;
      return next(castErr);
    }
    next(err);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      const castErr = new Error('Invalid task ID');
      castErr.status = 400;
      return next(castErr);
    }
    next(err);
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };

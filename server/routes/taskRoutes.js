const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { taskValidationRules, validate } = require('../middleware/validate');

router.route('/').get(getAllTasks).post(taskValidationRules(), validate, createTask);

router.route('/:id').put(taskValidationRules(), validate, updateTask).delete(deleteTask);

module.exports = router;

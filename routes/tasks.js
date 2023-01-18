const express = require('express');
const router = express.Router();

const tasks = require('../controller/tasksController.js');

router.get('/', tasks.getDB);

router.get('/:id', tasks.getTask)

router.post('/', tasks.createTask);

router.put('/:id', tasks.updateTask);

router.delete('/:id', tasks.deleteTask);

module.exports = router;
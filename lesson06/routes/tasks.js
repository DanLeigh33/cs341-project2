const express = require('express');
const router = express.Router();

const tasks = require('../controller/tasksController.js');
const validate = require('../mw/validateTask.js');

router.get('/', tasks.getDB);

router.get('/:id', tasks.getTask)

router.post('/', validate.checkTask, tasks.createTask);

router.put('/:id', validate.checkTask, tasks.updateTask);

router.delete('/:id', tasks.deleteTask);

module.exports = router;
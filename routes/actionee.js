const express = require('express');
const router = express.Router();

const actionee = require('../controller/actioneeController.js');

router.get('/', actionee.getDB);

router.get('/:id', actionee.getActionee);

router.post('/', actionee.createActionee);

router.put('/:id', actionee.updateActionee);

router.delete('/:id', actionee.deleteActionee);

module.exports = router;
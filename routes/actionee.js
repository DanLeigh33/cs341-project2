const express = require('express');
const router = express.Router();

const actionee = require('../controller/actioneeController.js');
const validate = require('../mw/validateActionee.js');

router.get('/', actionee.getDB);

router.get('/:id', actionee.getActionee);

router.post('/', validate.checkActionee, actionee.createActionee);

router.put('/:id', validate.checkActionee, actionee.updateActionee);

router.delete('/:id', actionee.deleteActionee);

module.exports = router;
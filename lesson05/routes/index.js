const routes = require('express').Router();

routes.use('/actionee', require('./actionee.js'));
routes.use('/tasks', require('./tasks.js'));
routes.use('/', require('./swagger.js'));

module.exports = routes;
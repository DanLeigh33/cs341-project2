const validator = require('../help/validate.js');

const checkActionee = (req, res, next) => {
  const rule = {
    actionee: 'required|string',
    activeTasks: 'required|integer',
    completedTasks: 'required|integer',
  };
  validator(req.body, rule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = { checkActionee };
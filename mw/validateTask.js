const validator = require('../help/validate.js');

const checkTask = (req, res, next) => {
  const rule = {
    taskName : 'required|string',
    status : 'required|string',
    startDate : 'required|string',
    dueDate : 'required|string',
    importance : 'required|string',
    actionee: 'required|string',
    backupActionee : 'string'
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

module.exports = { checkTask };
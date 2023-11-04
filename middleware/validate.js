const validator = require('../helpers/validate');

const saveEmployee = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    position: 'required|string',
    department: 'required|string',
    gender: 'required|string',
    dob: 'string',
    phoneNumber: 'required|string',
    startDate: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
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

const saveDepartment = (req, res, next) => {
  const validationRule = {
    departmentName: 'required|string',
    departmentHead: 'required|string',
    departmentBudget: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
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

module.exports = {
  saveEmployee, saveDepartment
};
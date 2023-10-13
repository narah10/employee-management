const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

router.get('/', employeesController.getAll);
router.post('/', employeesController.createEmployee);
router.put('/:id', employeesController.updateEmployee);

module.exports = router;
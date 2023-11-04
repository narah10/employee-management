const express = require('express');
const router = express.Router();

// const validation = require('../middleware/validate')
const departmentController = require('../controllers/department')

// router.get('/', employeesController.getAll);
router.get('/', departmentController.getAll)
router.get('/:id', departmentController.getSingle)
router.post('/', departmentController.createDepartment)
router.put('/:id', departmentController.updateDepartment)
router.delete('/:id', departmentController.deleteDepartment)


module.exports = router;
const express = require('express');
const router = express.Router();

router.use('/employees', require('./employees'));
router.use('/department', require('./department'));
router.use('/', require('./swagger'));

module.exports = router;
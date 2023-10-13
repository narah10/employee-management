const express = require('express');
const router = express.Router();

router.use('/employees', require('./employees'));
router.use('/', require('./swagger'));

module.exports = router;
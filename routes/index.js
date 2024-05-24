const express = require('express');
const router = express.Router();

const emailRoutes = require('./email');
const userRoutes = require('./user');

router.use('/email', emailRoutes);
router.use('/user', userRoutes);

module.exports = router;

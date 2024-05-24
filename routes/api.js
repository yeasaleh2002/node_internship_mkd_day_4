const express = require('express');
const router = express.Router();

const emailRoute = require('./email');
const userRoute = require('./user');

// Mount routes from each module
router.use('/rules', emailRoute);
router.use('/variables', userRoute);

module.exports = router;

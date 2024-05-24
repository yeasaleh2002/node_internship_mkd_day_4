const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/email');
const userRoutes = require('./routes/user');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/user', userRoutes);

// Sync database
sequelize.sync()
    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });

module.exports = app;

const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.update(req.body);
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;

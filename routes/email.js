const express = require('express');
const router = express.Router();
const { Email } = require('../models');

router.get('/', async (req, res) => {
    const emails = await Email.findAll();
    res.json(emails);
});

router.get('/:id', async (req, res) => {
    const email = await Email.findByPk(req.params.id);
    if (email) {
        res.json(email);
    } else {
        res.status(404).send('Email not found');
    }
});

router.post('/', async (req, res) => {
    const email = await Email.create(req.body);
    res.status(201).json(email);
});

router.put('/:id', async (req, res) => {
    const email = await Email.findByPk(req.params.id);
    if (email) {
        await email.update(req.body);
        res.json(email);
    } else {
        res.status(404).send('Email not found');
    }
});

router.delete('/:id', async (req, res) => {
    const email = await Email.findByPk(req.params.id);
    if (email) {
        await email.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Email not found');
    }
});

module.exports = router;

const express = require('express');

const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => { // rfid - (req, res, next) = request response next
    try {
        let results = await db.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    // res.json({ test: 'test' }); // rfid - teste
});

router.get('/nome', async (req, res, next) => { // rfid - (req, res, next) = request response next
    try {
        let results = await db.one(req.params.nome);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;

// rfid - router.delete delete / router.post create / router.put update / router.get read //
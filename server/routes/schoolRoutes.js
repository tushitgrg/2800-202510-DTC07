const express = require('express');
const router = express.Router();
const schools = require('../data/schools.json');

router.get('/search', (req, res) => {
    const q = (req.query.q || '').toLowerCase();
    const filtered = schools
        .filter(school => school.name.toLowerCase().includes(q))
        .slice(0, 10);
    res.json(filtered);
});

module.exports = router;

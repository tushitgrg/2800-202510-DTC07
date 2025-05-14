const express = require('express');
const router = express.Router();
const schools = require('../data/cleaned-schools.json');
const cache = new Map();

router.get('/search', (req, res) => {
    const q = (req.query.q || '').toLowerCase();
    if (cache.has(q)) return res.json(cache.get(q));
    const filtered = schools
        .filter(school => school.toLowerCase().includes(q))
        .slice(0, 10).map((n)=>{return {name:n}});
    cache.set(q, filtered);
    res.json(filtered);
});

module.exports = router;

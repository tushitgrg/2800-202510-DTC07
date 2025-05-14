const express = require('express');
const router = express.Router();
const schools = require('../data/lowercased-schools.json');
const cache = new Map();

router.get('/search', (req, res) => {
    
    const q = (req.query.q || '').toLowerCase();
    if (cache.has(q)) return res.json(cache.get(q));
    const filtered = schools
        .filter(school => school.includes(q))
        .slice(0, 10).map((n)=>{return {name:n}});
    if (cache.size > 1000) cache.clear();
    cache.set(q, filtered);
    res.json(filtered);
});

module.exports = router;

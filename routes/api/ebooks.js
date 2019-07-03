const express = require('express');
const router = express.Router();
const dbConnect = require('../../config/db_connection');

/**
 * @route GET api/ebooks
 * @desc get all ebooks
 * @access public
 */
router.get('/', (req, res) => {
    const pool = dbConnect();
    pool.query('SELECT * FROM ebooks', (err, result) => {
        if (err) {
            console.log(err);
        }
        const results = result.rows;
        res.json({ results });
    })
});

module.exports = router;

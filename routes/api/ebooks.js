const express = require('express');
const router = express.Router();
const dbConnect = require('../../config/db_connection');
const pool = dbConnect();

/**
 * @route GET api/ebooks
 * @desc get all ebooks
 * @access public
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM ebooks', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result.rows);
    })
});

/**
 * @route POST api/ebooks
 * @desc add an ebook
 * @access private
 */
router.post('/', (req, res) => {
    const { title, description, author, price, date_added } = req.body;
    pool.query(
        'INSERT INTO ebooks (title, description, author, price, date_added) VALUES ($1, $2, $3, $4, $5)',
        [title, description, author, price, date_added],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json({ result });
        })
});

/**
 * @route UPDATE api/ebooks/edit
 * @desc edit an ebook
 * @access private
 */
router.post('/edit', (req, res) => {
    const { title, description, author, price, date_added, id } = req.body;
    pool.query(
        'UPDATE ebooks SET title = $1, description = $2, author = $3, price = $4, date_added = $5 WHERE id = $6',
        [title, description, author, price, date_added, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json({ result });
        })
});

/**
 * @route DELETE api/ebooks/delete
 * @desc delete an ebook
 * @access private
 */
router.delete('/delete', (req, res) => {
    const { id } = req.body;
    pool.query(
        'DELETE FROM ebooks WHERE id = $1',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json({ result });
        })
});

module.exports = router;

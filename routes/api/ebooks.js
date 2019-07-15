const express = require('express');
const fs = require('fs');
const path = require('path');
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
    const { title, description, author, price, date_added, img, user_id } = req.body;
    if (img === null || img.trim() === '') {
        pool.query(
            'INSERT INTO ebooks (title, description, author, price, date_added, img, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [title, description, author, price, date_added, 'noimage', user_id],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.json({ result });
            })
    } else {
        pool.query(
            'INSERT INTO ebooks (title, description, author, price, date_added, img, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [title, description, author, price, date_added, img, user_id],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.json({ result });
            })
    }

});

/**
 * @route POST api/ebooks/img
 * @desc add an img
 * @access private
 */
router.post('/uploadimg', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    //get file
    const file = req.files.file;

    //move file to directory
    file.mv(`${__dirname}/../../client/public/images/${file.name}`, err => {
        //if there is an error, send 500 with error
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        //else send 200 with file name and path
        res.json({ fileName: file.name, filePath: `/images/${file.name}` });
    })
});

/**
 * @route UPDATE api/ebooks/edit
 * @desc edit an ebook
 * @access private
 */
router.post('/edit', (req, res) => {
    const { title, description, author, price, id, img, oldImgName } = req.body.ebook;

    /** delete old img if img is updated*/
    // if (oldImgName.trim() !== img.trim()) {
    //     //delete img 
    //     const directory = path.join('client/public/images', oldImgName.trim());
    //     fs.unlink(directory, (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // }

    pool.query(
        'UPDATE ebooks SET title = $1, description = $2, author = $3, price = $4, img = $5 WHERE id = $6',
        [title, description, author, price, img.trim(), id],
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
router.post('/delete', (req, res) => {
    const { id, img } = req.body;

    if (img !== null) {
        //delete img 
        const directory = path.join('client/public/images', img.trim());
        fs.unlink(directory, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    pool.query(
        'DELETE FROM ebooks WHERE id = $1',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json({ result });
        }
    )
});

module.exports = router;

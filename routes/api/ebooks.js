const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
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
    if (result.rowCount === 0) {
      return res.json({ msg: 'No eBooks added' });
    }
    res.json(result.rows);
  });
});

/**
 * @route GET api/ebooks/:id
 * @desc get all ebooks posted by uploader
 * @access private
 */
router.post('/id/:id', (req, res) => {
  pool.query(
    'SELECT * FROM ebooks WHERE user_id=$1',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.rowCount === 0) {
        return res.json({ msg: 'No eBooks uploaded' });
      }
      res.json(result.rows);
    }
  );
});

/**
 * @route POST api/ebooks
 * @desc add an ebook
 * @access private
 */
router.post('/', (req, res) => {
  const {
    title,
    description,
    author,
    price,
    date_added,
    img,
    user_id
  } = req.body;
  //null verification
  if (!title || !description || !author || !price) {
    return res.status(400).json({ msg: 'Please Enter All Fields' });
  }

  if (img === null || img.trim() === '') {
    pool.query(
      'INSERT INTO ebooks (title, description, author, price, date_added, img, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [title, description, author, price, date_added, 'noimage', user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.json({ result });
      }
    );
  } else {
    pool.query(
      'INSERT INTO ebooks (title, description, author, price, date_added, img, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [title, description, author, price, date_added, img, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.json({ result });
      }
    );
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
  });
});

/**
 * @route UPDATE api/ebooks/edit
 * @desc edit an ebook
 * @access private
 */
router.post('/edit', (req, res) => {
  const {
    title,
    description,
    author,
    price,
    id,
    img,
    oldImgName
  } = req.body.ebook;
  //null verification
  if (!title || !description || !author || !price) {
    return res.status(400).json({ msg: 'Please Enter All Fields' });
  }
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
    }
  );
});

/**
 * @route DELETE api/ebooks/delete
 * @desc delete an ebook
 * @access private
 */
router.post('/delete', (req, res) => {
  const { id, img } = req.body;

  if (img.trim() !== 'noimage') {
    //delete img
    const directory = path.join('client/public/images', img.trim());
    fs.unlink(directory, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  pool.query('DELETE FROM ebooks WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ result });
  });
});

/**
 * @route GET api/ebooks/key
 * @desc get stripe publish key
 * @access public
 */
router.get('/key', (req, res) => {
  res.json({
    stripePublishableKey: keys.stripePublishableKey
  });
});

/**
 * @route POST api/ebooks/charge
 * @desc receive order info and process purchase
 * @access public
 */
router.post('/charge', (req, res) => {
  //define amount
  let price = req.body.price;
  let nonIntPrice = price.replace('$', '');
  let amount = Math.round(nonIntPrice * 100);
  // create customer **FIX LATER
  // stripe.customers.create({
  //     email: req.body.email,
  //     name: req.body.name,
  //     source: req.body.token
  // })
  //     //charge customer
  //     .then(customer => stripe.charges.create({
  //         amount: amount,
  //         description: 'Cool Ebook',
  //         currency: 'usd',
  //         customer: customer.id
  //     }))
  stripe.charges.create({
    amount: amount,
    description: `Purchase of a copy of ${
      req.body.title
    } from Fake eBook Store`,
    currency: 'usd',
    source: req.body.token.id
  });
  // send success msg
  res.json({ msg: 'Transaction Complete!' });
});

module.exports = router;

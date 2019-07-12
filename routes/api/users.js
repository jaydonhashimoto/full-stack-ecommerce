const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const dbConnect = require('../../config/db_connection');
const pool = dbConnect();

/**
 * @route POST api/users
 * @desc register a new user
 * @access public
 */
router.post('/', (req, res) => {
    const { email, password } = req.body;
    const register_date = new Date();

    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newUser = {
        id: '', email, password, register_date
    };

    pool.query(
        'SELECT * from users WHERE email=$1',
        [email],
        (err, result) => {
            if (err) {
                //check error
                console.log(err);
            } else if (result.rowCount === 1) {
                //check existing user
                return res.status(400).json({ msg: 'User already exists' });
            } else {
                //create salt and hash
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (error) throw error;

                        //set password to new hash
                        newUser.password = hash;
                        newUser.id = result.rows.id;

                        //send data to db and send user res
                        pool.query(
                            'INSERT INTO users (email, password, register_date) VALUES ($1, $2, $3)',
                            [newUser.email, newUser.password, newUser.register_date],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                jwt.sign(
                                    { id: newUser.id },
                                    config.get('jwtSecret'),
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if (err) console.log(err);
                                        res.json({
                                            token,
                                            user: {
                                                id: newUser.id,
                                                email: newUser.email
                                            }
                                        });
                                    }
                                )
                            }
                        )
                    })
                })
            }

        }
    )
});
module.exports = router;

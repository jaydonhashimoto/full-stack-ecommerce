const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const dbConnect = require('../../config/db_connection');
const pool = dbConnect();

/**
 * @route POST api/auth
 * @desc Auth user
 * @access Public
 */
router.post('/', (req, res) => {
    const { email, password } = req.body;

    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //check for existing user
    pool.query(
        'SELECT * from users WHERE email=$1',
        [email],
        (err, result) => {
            if (err) {
                //check error
                console.log(err);
            } else if (result.rowCount === 0) {
                //check if user exists
                return res.status(400).json({ msg: 'User Does Not Exist' });
            } else {
                //validate password
                bcrypt.compare(password, result.rows[0].password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({ msg: 'Invalid Credentials' });
                        }

                        //sign jwt token with payload, secret, expiration, cb
                        jwt.sign(
                            { id: result.rows[0].id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (error, token) => {
                                if (error) throw error;
                                res.json({
                                    token,
                                    user: {
                                        id: result.rows[0].id,
                                        email: result.rows[0].email
                                    }
                                });
                            }
                        )
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

        }
    )

});

/**
 * @route GET api/auth/user
 * @desc Get user data without pw
 * @access Private
 */
router.get('/user', auth, (req, res) => {
    pool.query(
        'SELECT id, email FROM users WHERE id = $1',
        [req.user.id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json(result.rows[0]);
        }
    )
})

module.exports = router;
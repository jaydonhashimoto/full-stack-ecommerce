const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

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
                bcrypt.compare(password, result.rows.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({ msg: 'Invalid Credentials' });
                        }

                        //sign jwt token with payload, secret, expiration, cb
                        jwt.sign(
                            { id: result.rows.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: result.rows.id,
                                        email: result.rows.email
                                    }
                                });
                            }
                        )
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
            res.json(result.rows)
        }
    )
})

module.exports = router;
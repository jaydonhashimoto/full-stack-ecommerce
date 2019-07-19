if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod')
} else {
    console.log("USING DEVELOPMENT KEYS");
    module.exports = require('./keys_dev')
}
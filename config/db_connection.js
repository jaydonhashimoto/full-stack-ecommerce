const config = require('config');
const { Pool } = require('pg');
const connString = config.get('pgURI');

//connect to postgres db
function dbConnect() {
    //production
    if (process.env.NODE_ENV === 'production') {
        const pool = new Pool({
            connectionString: process.env.DB_CONNECTION_STRING
        });
        return pool;
    }
    //development
    const pool = new Pool({
        connectionString: connString
    });
    return pool;
}

module.exports = dbConnect;
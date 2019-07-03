const config = require('config');
const { Pool } = require('pg');
const connString = config.get('pgURI');

//connect to postgres db
function dbConnect() {
    //connect to postgres
    const pool = new Pool({
        connectionString: connString
    });
    return pool;
}

module.exports = dbConnect;
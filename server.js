const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();

//bodyParser middleware
app.use(express.json());
//handles form submissions and url encoded data
app.use(express.urlencoded({ extended: false }));

//connect to postgres
const connectionString = '';
const pool = new Pool({
    connectionString: connectionString
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`));
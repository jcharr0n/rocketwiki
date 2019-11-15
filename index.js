// dependencies
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// setup express app
const app = express();
const port = 4000;
app.use(express.static('/public'));
const router = express.Router();

// my sql connection
const config = {
  host: 'localhost',
  user: 'debian-sys-maint',
  password: 'qQRq84cGJRSjbanJ',
  database: 'itemdb'
};

// create the pool for mysql db
const pool = mysql.createPool(config);

// export the pool
module.exports = pool;

// setup the home page
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/', router);

// pull data from a mysql query at the /query endpoint :)
app.get('/query', function(req, res) {

    pool.query('SELECT * FROM itemdb.main_item_list ORDER BY name', function (error, rows, fields) {
        if (error) throw error

        // log the query result to the console, ie ubuntu terminal, selecting whatever data desired
        console.log('Here is the name attribute of the first item: ' + rows[0].name);

        // sends the query results to the UI
        // can send html template here potentially
        res.send(rows);
    }); 
});

// clicking the submit button on the page will send this post message
app.post('/', function (req, res) {
    res.send('Hello World Post!');
});

app.listen(port, () => console.log('Listening on port ' + port));
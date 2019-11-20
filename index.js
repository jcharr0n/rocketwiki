// dependencies
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// setup express app
const app = express();
const port = 4000;
app.use(express.static(path.resolve('./public')));
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

// setup pages
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
router.get('/directory', function (req, res) {
    res.sendFile(path.join(__dirname + '/directory.html'));
});
app.use('/', router);
app.use('/directory', router);

// pull data from a mysql query at the /query endpoint :)
app.get('/query', function(req, res) {
    
    // store request parameters to pass to query
    var
        name = req.query.name,
        category = req.query.category,
        rarity = req.query.rarity,
        obtain_method = req.query.obtain_method,
        hitbox = req.query.hitbox;

    pool.query('SELECT * FROM itemdb.main_item_list WHERE name = ? OR category = ? OR rarity = ? OR obtain_method = ? OR hitbox = ? ORDER BY name',
                [name, category, rarity, obtain_method, hitbox] , function (error, rows, fields) {
        if (error) throw error

        console.log('Search results:\n');
        // log the query result to the console, ie ubuntu terminal, selecting whatever data desired
        for (var i = 0; i < rows.length; i++)
        {
            console.log(rows[i].name);
        }

        // sends the query results to the UI
        res.send(rows);
    }); 
});

// clicking the submit button on the page will send this post message
app.post('/', function (req, res) {
    res.send('Hello World Post!');
});

app.listen(port, () => console.log('Listening on port ' + port));
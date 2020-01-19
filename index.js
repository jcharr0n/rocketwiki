// dependencies
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// express setup
const app = express();
const port = 4000;
app.use(express.static(path.resolve('./public')));
const router = express.Router();

// mysql connection
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

// endpoint 01: query database for a list of items matching the selected criteria
app.get('/itemSearch', function(req, res) {
    
    // dynamically create query: only add populated fields to query string and param array
    var queryString = 'SELECT name, image, rarity FROM itemdb.main_item_list WHERE',
    passedParams = [],
    paramsToPass = [],
    expectedParams = ['category', 'rarity', 'obtain_method', 'hitbox'],

    category = req.query.category,
    rarity = req.query.rarity,
    obtain_method = req.query.obtain_method,
    hitbox = req.query.hitbox;

    passedParams.push(category, rarity, obtain_method, hitbox);
    var firstParamSet = false;
    for (var i = 0; i < passedParams.length; i++) {
        if(passedParams[i]) {
            // only add an AND if not the first new addition to the base query string
            if (firstParamSet) {
                queryString += ' AND';
            }
            queryString += ' ' + expectedParams[i] + ' = ?';
            paramsToPass.push(passedParams[i]);
            firstParamSet = true;
        }
    }
    
    queryString += ' ORDER BY name;';
    console.log('\n' + queryString);
    console.log(paramsToPass); // dev

    pool.query(queryString, paramsToPass, function (error, rows, fields) {
        if (error) throw error

        console.log('Search results:'); // debug
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i].name);
        }

        // sends the query results to the client
        res.send(rows);
    });
});

// endpoint 02: view a selected items full details (note: not yet distinct for dupe names)
app.get('/directory/:itemName', function(req, res) {

    var queryString = 'SELECT * FROM itemdb.main_item_list WHERE name = ?';
    pool.query(queryString, req.params.itemName, function(error, rows) {
        if (error) throw error 

        console.log('Item details:');
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i]);
        }

        // send back results
        res.send(rows);
    });
});

app.listen(port, () => console.log('Listening on port ' + port));
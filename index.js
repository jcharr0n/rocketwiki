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
    var queryString = 'SELECT name, image, rarity1, rarity2 FROM itemdb.main_item_list WHERE',
    incomingInputParams = [],
    outgoingParamsForQuery = [],
    associatedColumnNames = ['category', 'rarity1', 'obtain_method_1', 'hitbox'],

    category = req.query.category,
    rarity = req.query.rarity,
    obtain_method = req.query.obtain_method,
    hitbox = req.query.hitbox;

    incomingInputParams.push(category, rarity, obtain_method, hitbox);
    var firstParamSet = false;

    // iterate through any incoming params and add populated fields to the query
    for (var i = 0; i < incomingInputParams.length; i++) {
        if(incomingInputParams[i]) {
            // only add an AND if not the first new addition to the base query string
            if (firstParamSet) {
                queryString += ' AND';
            }

            // if the field is populated, adjust query. if field is rarity or obtain method,
            // check if there's a match with either of their two associated columns
            if (associatedColumnNames[i] == 'rarity1') {
                queryString += ' (rarity1 = ? OR rarity2 = ?)';
                outgoingParamsForQuery.push(incomingInputParams[i]);
                outgoingParamsForQuery.push(incomingInputParams[i]);
            }
            else if (associatedColumnNames[i] == 'obtain_method_1') {
                queryString += ' (obtain_method_1 = ? OR obtain_method_2 = ?)';
                outgoingParamsForQuery.push(incomingInputParams[i]);
                outgoingParamsForQuery.push(incomingInputParams[i]);
            }
            else {
                queryString += ' ' + associatedColumnNames[i] + ' = ?';
                outgoingParamsForQuery.push(incomingInputParams[i]);
            }
            
            firstParamSet = true;
        }
    }
    
    queryString += ' ORDER BY name;';
    console.log('\n' + queryString);
    console.log(outgoingParamsForQuery); // dev

    pool.query(queryString, outgoingParamsForQuery, function (error, rows, fields) {
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
app.get('/directory/itemProfile', function(req, res) {

    var queryString = 'SELECT * FROM itemdb.main_item_list WHERE name = ?';
    pool.query(queryString, req.query.name, function(error, rows) {
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
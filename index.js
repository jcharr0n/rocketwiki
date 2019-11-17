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

// temp copy of index for inserting results. im sure theres a better way to do this.
var htmlBefore = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Rocket Wiki</title><meta name="author" content="Jackson Charron"><link rel="shortcut icon" href="/media/images/favicon.ico" type="image/x-icon"><link rel="stylesheet" href="/css/home.css"></head><body><script src="/js/home.js"></script><div id="titleBar"></div><div id="bound1" class="boundaryBar"></div><div id="slideBar"></div><div id="bound2" class="boundaryBar"></div><div id="navBar"><div class="navItem">Home</div><div class="navItem">Item List</div><div class="navItem">Community</div><div class="navItem">About</div></div><div id="viewport"><div class="entry"> Search for an item:<form action="/query" method="get">Name: <input type="text" name="name" /><br/>Category: <input type="text" name="category" /><br/>Rarity: <input type="text" name="rarity" /><br/>Obtain Method: <input type="text" name="obtain_method" /><br/>Hitbox: <input type="text" name="hitbox" /><br/><input type="submit"/></form></div>',
    htmlAfter = '<div class="entry">Sample page entry</div><div class="entry">Sample page entry</div><div class="entry">Sample page entry</div></div></body></html>';
//

// setup the home page
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/', router);

// pull data from a mysql query at the /query endpoint :)
app.get('/query', function(req, res) {
    
    // store request parameters to pass to query
    var
        name = req.query.name,
        category = req.query.category,
        rarity = req.query.rarity,
        obtain_method = req.query.obtain_method,
        hitbox = req.query.hitbox;

    pool.query('SELECT * FROM itemdb.main_item_list WHERE name = ? OR category = ? OR rarity = ? OR obtain_method = ? OR hitbox = ?',
                [name, category, rarity, obtain_method, hitbox] , function (error, rows, fields) {
        if (error) throw error

        // send back html formatted response rather than json
        var htmlContent = '<h1>Search results for >>> ';

        // show searched criteria preceding the returned data
        if (name.length > 0)
        {
            htmlContent += 'name: ' + name;
        }
        if (category.length > 0)
        {
            htmlContent += 'category: ' + category;
        }
        if (rarity.length > 0)
        {
            htmlContent += 'rarity: ' + rarity;
        }
        if (obtain_method.length > 0)
        {
            htmlContent += 'obtain method: ' + obtain_method;
        }
        if (hitbox.length > 0)
        {
            htmlContent += 'hitbox: ' + hitbox;
        }

        console.log('Search results:\n');
        // log the query result to the console, ie ubuntu terminal, selecting whatever data desired
        for (var i = 0; i < rows.length; i++)
        {
            htmlContent += '</h1><h2> ' + rows[i].name + '</h2><br>';
            console.log(rows[i].name);
        }

        // sends the query results to the UI
        res.send((htmlBefore + htmlContent + htmlAfter));
    }); 
});

// clicking the submit button on the page will send this post message
app.post('/', function (req, res) {
    res.send('Hello World Post!');
});

app.listen(port, () => console.log('Listening on port ' + port));
var mysql = require('mysql');

// item database
var con = mysql.createConnection({
  host: "localhost",
  user: "debian-sys-maint",
  password: "qQRq84cGJRSjbanJ"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('SELECT * FROM itemdb.main_item_list ORDER BY name', function(err, rows, fields) {
  if (!err)
  {
    console.log('Here is the data: ', rows);
  }
  else
  {
    console.log('Error occured');
  }
});

con.end();
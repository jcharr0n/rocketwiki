var mysql = require('mysql');

// i know its bad practice to have this file publicly visible.
// there is nothing in the db right now though
var con = mysql.createConnection({
  host: "localhost",
  user: "debian-sys-maint",
  password: "qQRq84cGJRSjbanJ"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
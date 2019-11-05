var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "debian-sys-maint",
  password: "qQRq84cGJRSjbanJ"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
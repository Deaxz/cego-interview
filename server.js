const http = require("http");
const mysql = require('mysql');

// Create connection to DB.
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cego"
});

// Testing query.
let sql = "SELECT * FROM users";

http.createServer((req, res) =>  {

  console.log(`Request received: {method: '${req.method}' url: '${req.url}'}`);

  // Connecting to DB.
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });
  
}).listen(8000);
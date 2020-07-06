const http = require("http");
const mysql = require("mysql");
const fs = require("fs");

// Create connection to DB.
let db = mysql.createConnection({
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
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // Select query.
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));

      // Creating and writing to file. Overwrites if it exists.
      fs.write('result.txt', JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    });
  });
}).listen(8000);
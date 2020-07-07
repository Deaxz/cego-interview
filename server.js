const http = require("http");
const mysql = require("mysql");
const fs = require("fs");
const url = require("url");

// Create connection to DB.
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cego"
});

// Connects to DB.
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

http.createServer((req, res) =>  {

  console.log(`Request received: {method: '${req.method}' url: '${req.url}'}`);

  // Parses url and returns query part of url object.
  let queryData = url.parse(req.url, true).query;
  
  // Assigns the sql string from query object to sql variable.
  let sql = queryData.sql;
  
  // Select query.
  db.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("Result: " + JSON.stringify(result));

    // Creating and writing to file. Overwrites if it exists.
    fs.writeFile('result.txt', JSON.stringify(result), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });
  
}).listen(8000);



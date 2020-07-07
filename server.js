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

// Deletes old file if it exists.
fs.unlink('./result.txt', (err) => {
  if (err) 
    console.log("No previous result file");
  else 
    console.log("Old result was deleted.");
});

http.createServer((req, res) =>  {

  // Parses url and returns query part of url object.
  let queryData = url.parse(req.url, true).query;

  // Assigns the sql string from query object to sql variable, and makes it lowercase.
  let sql = queryData.sql.toLowerCase();

  // Select query.
  db.query(sql, function (err, result) {
    if (err) throw err;

    // Creating and writing to file. Overwrites if it exists.
    fs.appendFileSync('result.txt', JSON.stringify(result), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });   
  });

  // Removes "select *" or "select 'column name'" with "delete".
  let tempArr = sql.split('');
  tempArr.splice(0, tempArr.indexOf('f'), 'delete ');
  
  let rmsql = tempArr.join('');
  
  // Deletion query
  db.query(rmsql, function (err, result) {
    if (err) throw err;
  });

}).listen(8000);
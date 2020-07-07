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
  
  // Assigns the sql string from query object to sql variable, and makes it lowercase.
  let sql = queryData.sql.toLowerCase();

  // Select query.
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));

    // Creating and writing to file. Overwrites if it exists.
    fs.writeFileSync('result.txt', JSON.stringify(result), function (err) {
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
    console.log("Deleted: " + JSON.stringify(result));
  });

}).listen(8000);

const http = require("http");

http.createServer((req, res) =>  {

  console.log(`Request received: {method: '${req.method} url: '${req.url}'}`);


}).listen(8000);
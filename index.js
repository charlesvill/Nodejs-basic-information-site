import http from 'http';
import url from 'url';
import fs from 'fs';

http.createServer(function(req, res) {
  const q = url.parse(req.url, true);
  const input = q.pathname;
  let filename;

  switch (input) {
    case "/about":
      filename = "about";
      break;
    case "/contact-me": 
      filename = "contact-me";
      break;
    case "/":
      filename = "index";
      break;
    default: 
      filename = "404";
  }
  
  filename += ".html";

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      return res.end("There was an error with server");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  })


}).listen(8080);


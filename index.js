const http = require("http");
const fs = require("fs");
const url = require("url");

let page404;
fs.readFile("./404.html", (err, data) => {
  if (err) throw err;
  page404 = data;
});

const server = http.createServer((req, res) => {
  const urlObject = url.parse(req.url, true);
  const pathname = urlObject.pathname;
  const fileName = pathname === "/" ? "./index.html" : "." + pathname + ".html";
  res.setHeader("Content-Type", "text/html");
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(page404);
    }
    res.statusCode = 200;
    res.end(data);
  });
});

server.listen(8080);

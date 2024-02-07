#!/usr/bin/env node

const http = require("http");
const cli = require("narch-cli");
const Endpoint = require("./src/endpoint");

const appCommands = {
  run,
};

function run() {
  const server = http.createServer((req, res) => {
    try {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      if (req.url == "/") {
        res.end("Narch.js is runed");
      } else {
        const { url, method } = req;
        const endpoint = new Endpoint(url, method);
        const result = endpoint.execute();
        res.end(JSON.stringify(result));
      }
    } catch (error) {
      res.writeHead(500, {'Content-Type': 'text/plain'});;
      res.end(JSON.stringify(error));
    } 
  });
  server.listen(3000);
  console.log("Narch server started on: http://localhost:3000");
}

cli.run(appCommands);
#!/usr/bin/env node

const http = require("http");
const cli = require("narch-cli");

const appCommands = {
  run,
};

cli.run(appCommands);

function run() {
  const server = http.createServer((req, res) => {
    if (req.url == "/") {
      res.write("Narch.js is runed");
    }
    res.end();
  });
  server.listen(3000);
  console.log("Narch server started on: http://localhost:3000");
}

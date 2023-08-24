#!/usr/bin/env node

const http = require("http");

var argv = require("yargs/yargs")(process.argv.slice(2)).argv;

const commands = {
  c: {
    controller: () => console.log("create controller"),
  },
  run: () => console.log("run")
};

run();

function run() {
  const key = getKey();
  if (key) {
    const command = getCommand(key);
    commands[key][command]();
  } else {
    const list = getCommand(key);
    const command = getFirst(list);
    commands[command]();
  } 
}

function getFirst(list) {
  if (list && list.length > 0) return list[0];
  return null;
}

function getCommands() {
  return argv["_"];
}

function getCommand(key) {
  return argv[key];
}

function getKey() {
  return Object.keys(argv).find((i) => !i.includes("$") && i != "_");
}

// const server = http.createServer((req, res) => {
//   if (req.url == "/") {
//     res.write("hello from home page");
//   }
//   if (req.url == "/courses") {
//     res.write(JSON.stringify(["moein"]));
//   }
//   res.end();
// });
// server.listen(3000);

// console.log("server started on: http://localhost:3000");

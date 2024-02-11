#!/usr/bin/env node

import NarchCLI from "narch-cli";
const appCommands = {
  project,
  middleware
};
const cli = new NarchCLI()
cli.run(appCommands);

function project() {
  console.log("created");
}

function middleware() {
  console.log("middleware");
}
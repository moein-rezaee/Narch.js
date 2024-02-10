#!/usr/bin/env node

import http from "http";
import Endpoint from "./endpoint.js";
import { RouterMethods } from './decorators/http-methods/index.js';
import { IDecorators } from "./interfaces.js";
import * as Types from "./types.js";
import * as Interfaces from "./interfaces.js";

// import NarchCLI from "narch-cli";
// const appCommands = {
//   run,
// };
// const cli = new NarchCLI()
// cli.run(appCommands);

function run(): void {
  const server = http.createServer((req: any, res: any) => {
    try {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      if (req.url == "/") {
        res.end("Narch.js is runed");
      } else {
        const { url, method } = req;
        const endpoint = new Endpoint(url, method);
        const result = endpoint.execute();
        res.end(JSON.stringify(result));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });;
      res.end(JSON.stringify(error));
    }
  });
  server.listen(3000);
  console.log("Narch server started on: http://localhost:3000");
}

run();
export default abstract class Narch {
  public static Types: any = Types;
  public static Interfaces: any = Interfaces;
  public static Decorators: IDecorators = {
    RouterMethods
  };
}
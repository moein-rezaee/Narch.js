
import http from "http";
import Endpoint from "./endpoint.js";
import AppConfig from "./appConfig.js";
const busboy = require('busboy');
const fs = require('fs');
const os = require('os');
const path = require('path');


module.exports = class Narch {
  public static Instance: Narch;
  public static IsRun: boolean = false;

  constructor() {
    if (Narch.Instance) return Narch.Instance;
    Narch.Instance = this;
  }

  public static Run(config: any) {
    const narch = new Narch();
    narch.createServer(config);
  };

  private createServer(config: any): void {
    if (Narch.IsRun) return;
    AppConfig.Set(config);
    const server = http.createServer((req: any, res: any) => {
      try {
        if (req.url == "/") {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end("Narch.js is runed");
        }
        else if (req.url == "/favicon.ico") {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end("favicon notfoud!");
        }
        else {
          const { url, method } = req;
          const endpoint = new Endpoint(url, method);

          const data: any = {};
          const files: any = {};

          if (req.method === 'POST' || req.method === 'PUT') {
            const bb = busboy({ headers: req.headers });
            bb.on('file', (name: string, file: any, { filename, mimeType }: any) => {
              let size: number = 0;
              file.on('data', (chunk: string) => {
                size += chunk.length;
                // TODO
                // if(fileSize > ) 
                //   req.unpipe(busboy);
                //   res.status(500).end('Limit Reached');
              }).on('close', () => {
                // TODO: if filename.isExist() and is validate then add file

                const filenameParts = filename.split(".");
                const lastIndex = filenameParts.length - 1;
                const ext = filenameParts[lastIndex];
                const fileData = {
                  file,
                  filename,
                  mimeType,
                  ext,
                  size: {
                    byte: size,
                    kilobyte: Number((size / 1024).toFixed(0)),
                    megabyte: Number((size / (1024 * 1024)).toFixed(2)),
                  },
                  save: (basePath: string, newName: string | undefined) => {
                    const saveTo = path.join(basePath, `/${newName ?? name}`);
                    const fileStream = fs.createWriteStream(saveTo, 'utf8');
                    file.pipe(fileStream);
                  },
                  index: 0
                };
                //TODO: count of fileData
                if (files[name] && files[name].length > 0) {
                  fileData.index = files[name].length;
                  files[name].push(fileData);
                } else {
                  files[name] = [fileData]
                }
                console.log(`File [${name}] done`);
              });
            });
            bb.on('field', (name: string, val: any, info: any) => {
              console.log(`Field [${name}]: value: %j`, val);
              data[name] = val;
            });
            bb.on('close', () => {
              const result = endpoint.execute(data, files);
              console.log('Done parsing form!');
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end(JSON.stringify(result));
            });
            req.pipe(bb);
          } else if (req.method === 'GET' || req.method === 'DELETE') {
            const result = endpoint.execute();
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(result));
          }
        }
      } catch (error: any) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.message);
      }
    });
    server.listen(3000);
    Narch.IsRun = true;
    console.log("Narch server started on: http://localhost:3000");
  }
}
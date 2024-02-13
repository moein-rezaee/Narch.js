
import http from "http";
import AppConfig from "./appConfig.js";
import { RequestManager } from "./requestManager.js";

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
        RequestManager.Run(req, res);
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
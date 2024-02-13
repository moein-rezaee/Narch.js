import { FormManager } from "./FormManager.js";
import Endpoint from "./endpoint.js";

export class RequestManager {
  req: any;
  res: any;
  constructor(req: any, res: any) {
    this.req = req;
    this.res = res;
  }

  public static Run(req: any, res: any) {
    const reqManager = new RequestManager(req, res);
    reqManager.run();
  }

  public run(): any {
    const self: any = this;
    const method: string = self.req.method.toLowerCase();
    self[method].call(self);
  }

  private async parseForm(): Promise<any> {
    const formManager = new FormManager();
    return await formManager.parse(this.req);
  }

  private async runByFormData() {
    const { url, method } = this.req;
    const { files, data } = await this.parseForm();
    const endpoint = new Endpoint(url, method);
    const result = endpoint.execute(data, files);
    this.res.writeHead(200, { 'Content-Type': 'text/plain' });
    this.res.end(JSON.stringify(result));
  }

  private async runByUrlParam() {
    const { url, method } = this.req;
    const endpoint = new Endpoint(url, method);
    const result = endpoint.execute();
    this.res.writeHead(200, { 'Content-Type': 'text/plain' });
    this.res.end(JSON.stringify(result));
  }

  private async get() {
    const { url } = this.req;
    if (url == "/") {
      this.res.writeHead(200, { 'Content-Type': 'text/plain' });
      this.res.end("Narch.js is runed");
    }
    else if (url == "/favicon.ico") {
      this.res.writeHead(404, { 'Content-Type': 'text/plain' });
      this.res.end("favicon notfoud!");
    }
    else {
      await this.runByUrlParam();
    }
  }

  private async post() {
    await this.runByFormData();
  }

  private async put() {
    await this.runByFormData();
  }

  private async delete() {
    await this.runByUrlParam();
  }
}

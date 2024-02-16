import Endpoint from "./endpoint.js";
import { FormManager } from "./formManager.js";

export class RequestManager {
  req: any;
  res: any;
  constructor(req: any, res: any) {
    this.req = req;
    this.res = res;
  }

  public static async Run(req: any, res: any) {
    const reqManager = new RequestManager(req, res);
    await reqManager.run();
  }

  public async run(): Promise<any> {
    const self: any = this;
    const method: string = self.req.method.toLowerCase();
    await self[method].call(self);
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

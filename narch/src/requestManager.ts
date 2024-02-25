import { FilesValidator } from './validators/filesValidator';
import Endpoint from "./endpoint.js";
import { FormManager } from "./formManager.js";
import { Action } from "./types.js";

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

  private async parseForm(filesValidator: FilesValidator): Promise<any> {
    const formManager = new FormManager(filesValidator);
    return await formManager.parse(this.req);
  }

  private  getEndPoint() { 
    const { url, method } = this.req;
    return new Endpoint(decodeURIComponent(url), method);
  }

  private async runByFormData() {
    const endpoint = this.getEndPoint();
    const endpointInfo: Action = endpoint.info; 



    const { files, data } = await this.parseForm(endpoint.info.filesValidator);
    const result = endpoint.execute(data, files);
    this.res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    this.res.end(JSON.stringify(result));
  }

  private async runByUrlParam() {
    const endpoint = this.getEndPoint();
    const result = endpoint.execute();
    this.res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
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

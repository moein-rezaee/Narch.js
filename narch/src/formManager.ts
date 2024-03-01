const busboy = require('busboy');
import { FilesEventEmitter } from "./requestFileHandler/filesEventEmitter.js";
import { FileInfo, ValidateResult } from "./types.js";
import { FilesEventHandler } from "./requestFileHandler/filesEventHandler.js";
import { FilesValidator } from "./validators/filesValidator/index.js";
import { RequestFilesHandler } from "./requestFileHandler/index.js";


export class FormManager {
  private _data: any;
  private _reqFilesHandler: RequestFilesHandler;
  constructor(filesValidator: FilesValidator) {
    this._data = {};
    const emitter: FilesEventEmitter = this.getEventEmitter(filesValidator);
    this._reqFilesHandler = new RequestFilesHandler(emitter);
  }

  private getEventEmitter(filesValidator: FilesValidator) {
    const fileEventHandler = new FilesEventHandler(filesValidator);
    return new FilesEventEmitter(fileEventHandler);
  }

  public async parse(req: any) {
    const self = this;
    return new Promise((resolve, reject) => {
      const parser = self.getParser(req.headers);
      try {
        self.bindEvents(parser, resolve, reject);
        req.pipe(parser);
      } catch (err) {
        req.unpipe(parser)
        reject(err);
      }
    });
  }
  private getParser(headers: any): any {
    return busboy({ headers });
  }
  private bindEvents(parser: any, resolve: Function, reject: Function) {
    const self = this;
    parser.on("field", (name: string, val: any) => self.field.call(self, name, val));
    parser.on("file", async (name: string, data: any, info: any) => {
      const result: ValidateResult | undefined = await self.file.call(self, name, data, info);
      if (result) reject(result);
    });
    parser.on("close", () => self.close(resolve, reject));
  }

  private field(name: string, val: any): void {
    this._data[name] = val;
  }
  private async file(name: string, stream: any, { filename, mimeType }: any): Promise<ValidateResult | undefined> {
    const fileInfo: FileInfo = {
      fieldName: name,
      filename,
      mimeType,
    };
    return this._reqFilesHandler.reciveFile(fileInfo, stream);
  }
  private async close(resolve: Function, reject: Function) {
    const result: ValidateResult | undefined = await this._reqFilesHandler.close();
    if (!result?.isValid) reject(result);
    else {
      result.data = {
        data: this._data,
        files: this._reqFilesHandler.files
      };
      resolve(result);
    }
  }
}


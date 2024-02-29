const busboy = require('busboy');
import { FilesEventEmitter } from "./filesEventEmitter.js";
import { FileInfo, ValidateResult } from "./types.js";
import { FilesEventHandler } from "./filesEventHandler.js";
import { FilesValidator } from "./validators/filesValidator.js";


export class FormManager {
  private _data: any;
  private _fileEventEmitter: FilesEventEmitter;
  constructor(filesValidator: FilesValidator) {
    this._data = {};
    this._fileEventEmitter = this.getRequestFileHandler(filesValidator);
  }

  private getRequestFileHandler(filesValidator: FilesValidator) {
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

      const result = await self.file.call(self, name, data, info);
      reject(result); // if there is an error we call
    });
    parser.on("close", () => {

      try {
        self._fileEventEmitter.callClose();
      } catch (error) {
        reject(error);
      }

      const from = {
        data: self._data,
      };
      //TODO: files: result.data
      resolve(from);
    });
  }

  private field(name: string, val: any): void {
    this._data[name] = val;
  }
  private async file(name: string, file: any, { filename, mimeType }: any): Promise<any> {
    // TODO: if filename.isExist() and is validate then add file
    const fileInfo: FileInfo = {
      data: file,
      fieldName: name,
      filename,
      mimeType,
    };
    try {
      this._fileEventEmitter.callReceive(fileInfo);
      await this.recivedFile(file);
    } catch (error) {
      return error;
    }
  }
  private async recivedFile(file: any): Promise<number> {
    let size: number = 0;
    let err: any = null;
    return new Promise((resolve: Function, reject: Function) => {
      file.on('data', (chunk: string) => {
        size += chunk.length;
        try {
          this._fileEventEmitter.callStream(chunk, size);
        } catch (error) {
          file.destroy();
          err = error;
        }
      }).on('close', () => {
        this._fileEventEmitter.callEndStream(size);
        if (err) reject(err);
        else resolve(size);
      });
    });
  }
}

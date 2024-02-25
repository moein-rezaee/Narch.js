const busboy = require('busboy');
import { RequestFilesHandler } from "./requestFilesHandler.js";
import { FileInfo } from "./types.js";
import { FileEventHandler } from "./fileEventHandler.js";
import { FilesValidator } from "./validators/filesValidator.js";


export class FormManager {
  private _data: any;
  private _reqFilesHandler: RequestFilesHandler;
  constructor(filesValidator: FilesValidator) {
    this._data = {};
    this._reqFilesHandler = this.getRequestFileHandler(filesValidator);
  }

  private getRequestFileHandler(filesValidator: FilesValidator) {
    const fileEventHandler = new FileEventHandler(filesValidator);
    return new RequestFilesHandler(fileEventHandler);
  }

  public async parse(req: any) {
    const self= this;
    return new Promise((resolve, reject) => {
      try {
        const parser = self.getParser(req.headers);
        self.bindEvents(parser, resolve);
        req.pipe(parser);
      } catch (err) {
        reject(err);
      }
    });
  }

  private getParser(headers: any): any {
    return busboy({ headers });
  }

  private bindEvents(parser: any, resolve: Function) {
    const self = this;
    parser.on("field", (name: string, val: any) => self.field.call(self, name, val));
    parser.on("file", async (name: string, data: any, info: any) => self.file.call(self, name, data, info));
    parser.on("close", () => {
      const files: any = self._reqFilesHandler.callClose();
      const from = { 
        data: self._data, 
        files 
      };  
      resolve(from);
    });
  }

  private field(name: string, val: any): void {
    this._data[name] = val;
  }

  private async file(name: string, file: any, { filename, mimeType }: any): Promise<void> {
    // TODO: if filename.isExist() and is validate then add file
    const fileInfo: FileInfo = {
      data: file,
      fieldName: name,
      filename,
      mimeType,
    };
    
    this._reqFilesHandler.callReceive(fileInfo);
    await this.recivedFile(file);
  }

  private async recivedFile(file: any): Promise<number> {
    let size: number = 0;
    return new Promise((resolve: Function, reject: Function) => {
      try {
        file.on('data', (chunk: string) => {
          size += chunk.length;
          const resume: boolean = this._reqFilesHandler.callStream(chunk, size);
          console.log(resume);
          // TODO
          // if(fileSize > ) 
          //   req.unpipe(busboy);
          //   res.status(500).end('Limit Reached');
        }).on('close', () => {
          this._reqFilesHandler.callEndStream(size);
          resolve(size);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

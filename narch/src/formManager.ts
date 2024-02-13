const busboy = require('busboy');
import { FileData } from "./FileData.js";
import { FileInfo } from "./types.js";


export class FormManager {
  data: any;
  files: any;

  constructor() {
    this.data = {};
    this.files = {};
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
    const { data, files } = self;
    parser.on("field", (name: string, val: any) => self.field.call(self, name, val));
    parser.on("file", async (name: string, data: any, info: any) => self.file.call(self, name, data, info));
    parser.on("close", () => resolve({ data, files }));
  }

  private field(name: string, val: any): void {
    this.data[name] = val;
  }

  private async file(name: string, data: any, { filename, mimeType }: any): Promise<void> {
    // TODO: if filename.isExist() and is validate then add file
    let size: number = await this.recivedFile(data);
    const fileInfo: FileInfo = {
      data,
      fieldName: name,
      size,
      filename,
      mimeType,
    };
    this.addFile(fileInfo);
  }

  private async recivedFile(file: any): Promise<number> {
    let size: number = 0;
    return new Promise((resolve: Function, reject: Function) => {
      try {
        file.on('data', (chunk: string) => {
          size += chunk.length;
          // TODO
          // if(fileSize > ) 
          //   req.unpipe(busboy);
          //   res.status(500).end('Limit Reached');
        }).on('close', () => resolve(size));
      } catch (err) {
        reject(err);
      }
    });
  }


  addFile(i: FileInfo): void {
    //TODO: count of fileData
    const { fieldName: name } = i;
    const fileData: FileData = new FileData(i);
    if (this.files[name] && this.files[name].length > 0) {
      this.files[name].push(fileData);
    } else {
      this.files[name] = [fileData];
    }
  }
}

import { FilesEventEmitter } from "./filesEventEmitter.js";
import { FileInfo, ValidateResult } from "../types.js";
import { FileData } from "./fileData.js";
import { FileStream } from "./fileStream.js";

export class RequestFilesHandler {

  private _fileEventEmitter: FilesEventEmitter;
  private _files: any;

  constructor(filesValidator: FilesEventEmitter) {
    this._fileEventEmitter = filesValidator;
  }

  get emitter() {
    return this._fileEventEmitter;
  }
  get files() {
    return this._files;
  }

  private async safeRunner(func: Function): Promise<ValidateResult | undefined> {
    try {
      return func();
    } catch (error: any) {
      return {
        isValid: false,
        error
      } as ValidateResult;
    }
  }

  public async reciveFile(fileInfo: FileInfo, stream: any) {

    const resultOnRecived: any = this.safeRunner(() => this.emitter.callReceive(fileInfo));
    if (!resultOnRecived.isValid) return resultOnRecived;

    const resultOnStream: any = await this.safeRunner(async () => await this.runStream(stream));
    if (!resultOnStream.isValid) return resultOnStream;

    fileInfo.size = resultOnStream.data as number;
    fileInfo.stream = stream;
    this.addFile(fileInfo);
  }

  private async runStream(stream: any): Promise<ValidateResult> {
    const fileStream: FileStream = new FileStream(stream, this._fileEventEmitter);
    return fileStream.start();
  }

  private addFile(fileInfo: FileInfo): void {
    const name: string = fileInfo.fieldName;
    const fileData: FileData = new FileData(fileInfo);
    if (this._files[name] && this._files[name].length > 0) {
      this._files[name].push(fileData);
    }
    else {
      this._files[name] = [fileData];
    }
  }


  public close(): Promise<ValidateResult | undefined> {
    return this.safeRunner(() => this.emitter.callClose(this._files));
  }
}

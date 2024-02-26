import { EventEmitter } from 'events';
import { FileInfo } from './types';
import { FileEventHandler } from './fileEventHandler';

// const eventEmitter = new EventEmitter();
export class RequestFilesHandler {
  
  static Instance: RequestFilesHandler;
  private _event: EventEmitter | null = null;
  // private _fileEventHandler: FileEventHandler;
  constructor(fileEventHandler: FileEventHandler) {
    this._event = new EventEmitter();
    // this._fileEventHandler = fileEventHandler;
    this._event?.addListener("onReceive", fileEventHandler.onReceive.bind(fileEventHandler));
    this._event?.addListener("onStream", fileEventHandler.onStream.bind(fileEventHandler));
    this._event?.addListener("onEndStream", fileEventHandler.onEndStream.bind(fileEventHandler));
    this._event?.addListener("onClose", fileEventHandler.onClose.bind(fileEventHandler));
  }

  public callReceive(fileInfo: FileInfo): void {
    this._event?.emit("onReceive", fileInfo) as boolean;
  }

  public callStream(chunck: string, size: number): void {
    this._event?.emit("onStream", chunck, size);
  }
  public callEndStream(size: number): void {
    this._event?.emit("onEndStream", size);
  }

  public callClose(): any {
    return this._event?.emit("onClose");
  }
}


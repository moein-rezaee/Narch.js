import { EventEmitter } from 'events';
import { FileInfo, ValidateResult } from './types';
import { FilesEventHandler } from './filesEventHandler';

// const eventEmitter = new EventEmitter();
export class FilesEventEmitter {

  static Instance: FilesEventEmitter;
  private _event: EventEmitter;
  constructor(fileEventHandler: FilesEventHandler) {
    this._event = new EventEmitter();
    this.addListeners(fileEventHandler, "onReceive", "onStream", "onEndStream", "onClose");
  }

  addListeners(context: any, ...events: Array<string>): void {
    events.forEach(event => this.event.addListener(event, context[event].bind(context)));
  }

  public get event(): EventEmitter {
    return this._event;
  }

  public callReceive(fileInfo: FileInfo): void {
    this._event.emit("onReceive", fileInfo);
  }
  public callStream(chunck: string, size: number): void {
    this._event.emit("onStream", chunck, size);
  }
  public callEndStream(size: number): void {
    this._event.emit("onEndStream", size);
  }
  public callClose(): void {
    this._event?.emit("onClose");
  }
}


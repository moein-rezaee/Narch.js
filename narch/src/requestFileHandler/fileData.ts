import fs from 'fs';
import path from 'path';
import { FileDataInfo, FileInfo } from '../types';


export class FileData {
  private info: FileDataInfo;
  constructor(info: FileInfo) {
    this.info = {
      stream: info.stream,
      fieldName: info.fieldName,
      size: this.getFileSizeByUnits(info.size),
      ext: this.getExtension(info.filename),
      filename: info.filename,
      mimeType: info.mimeType
    };
  }

  private getExtension(filename: string): string {
    const filenameParts = filename.split(".");
    const lastIndex = filenameParts.length - 1;
    return filenameParts[lastIndex];
  }

  private getFileSizeByUnits(size?: number): any {
    if(!size) throw "file size not set"
    return {
      byte: size,
      kilobyte: this.getSizeToKB(size),
      megabyte: this.getSizeToMB(size),
    };
  }

  private getSizeToKB(size: number): number {
    return Number((size / 1024).toFixed(0));
  }

  private getSizeToMB(size: number): number {
    return Number((size / (1024 * 1024)).toFixed(2));
  }

  public save(basePath: string, newName: string) {
    const { stream, filename, ext } = this.info;
    const saveTo = path.join(basePath, `/${newName ?? filename}.${ext}`);
    this.info.address = saveTo;
    const fileStream = fs.createWriteStream(saveTo, 'utf8');
    stream.pipe(fileStream);
    return saveTo;
  }
}

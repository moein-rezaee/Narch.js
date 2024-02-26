import { FilesValidator } from './validators/filesValidator';
import { FileData } from "./fileData";
import { FileInfo, FormFileType } from "./types";

export class FileEventHandler {
  private _filesInfo: Array<FileInfo> = [];
  private _activeFileInfo: FileInfo | null = null;
  private _files: any = {};
  private _filesValidator: FilesValidator;

  constructor(filesValidator: FilesValidator) {
    this._filesValidator = filesValidator
  }

  public onReceive(fileInfo: FileInfo): void {
    this._activeFileInfo = fileInfo;
    this._filesValidator.setActiveSchema(fileInfo.fieldName); 
    this._filesValidator.validateMimeType(fileInfo.mimeType);
    this._filesInfo.push(fileInfo);
  }

  public onStream(chunck: string, sizeInByte: number): void {
    this._filesValidator.validateSize(sizeInByte); 
  }

  public onEndStream(size: number | undefined): void {
    if (!this._activeFileInfo) return;
    this._activeFileInfo.size = size;
    this.addFile();
  }

  public onClose(): any {
    this._filesValidator.validateFilesCount(this._files)
    this._filesValidator.validateFilesRequired(this._files)
    return this._files;
  }

  private addFile(): void {
    const fileInfo: FileInfo | null = this._activeFileInfo;
    const validator: FilesValidator | null = this._filesValidator;
    if (!fileInfo  || !validator) return;
    const name = validator.activeSchema?.key;
    if(!name) throw "schema key not set";
    const fileData: FileData = new FileData(fileInfo);
    if (this._files[name] && this._files[name].length > 0) {
      this._files[name].push(fileData);
    } else {
      this._files[name] = [fileData];
    }
  }
}

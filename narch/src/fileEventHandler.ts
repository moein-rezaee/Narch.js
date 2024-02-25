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
    const schemaValidation: FormFileType | undefined = this.getSchemaValidation(fileInfo.fieldName) 
    ///////////////////////// From HERE
    this._filesInfo.push(fileInfo);
  }

  private checkMimeType(){

  }

  private getSchemaValidation(fieldName: string) : FormFileType | undefined{
    return this._filesValidator.schemaValidations?.files.find((i: FormFileType) => i.fieldName == fieldName);
  }

  public onStream(chunck: string, size: number): boolean {
    console.log(chunck, size);
    // TODO: check size is valid?
    return true;
  }

  public onEndStream(size: number | undefined): void {
    if (!this._activeFileInfo) return
    this._activeFileInfo.size = size;
    this.addFile();
  }

  public onClose(): any {
    return this._files;
  }

  private addFile(): void {
    const fileInfo: FileInfo | null = this._activeFileInfo;
    if (!fileInfo) return;
    //TODO: count of fileData
    const { fieldName: name } = fileInfo;
    const fileData: FileData = new FileData(fileInfo);
    if (this._files[name] && this._files[name].length > 0) {
      this._files[name].push(fileData);
    } else {
      this._files[name] = [fileData];
    }
  }
}

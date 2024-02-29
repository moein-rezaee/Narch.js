import { FilesValidator } from './validators/filesValidator';
import { FileData } from "./fileData";
import { FileInfo, ValidateResult } from "./types";

export class FilesEventHandler {
  private _filesInfo: Array<FileInfo> = [];
  private _activeFileInfo: FileInfo | null = null;
  private _files: any = {};
  private _filesValidator: FilesValidator;

  constructor(filesValidator: FilesValidator) {
    this._filesValidator = filesValidator
  }

  public onReceive(fileInfo: FileInfo): void {
    this.activeFileInfo = fileInfo;
    this.addFileInfo(fileInfo);
    this.filesValidator.activeSchema = fileInfo.fieldName;

    const result: ValidateResult = this.filesValidator.validateMimeType(fileInfo.mimeType);
    if (!result.isValid)
      throw result.error;
  }
  public onStream(chunck: string, sizeInByte: number): void {
    const result: ValidateResult = this.filesValidator.validateSize(sizeInByte);
    if (!result.isValid)
      throw result.error;
  }
  public onEndStream(size: number | undefined): void {
    if (this.activeFileInfo)
      this.activeFileInfo.size = size;
    this.addFile();
  }
  public onClose(): void {
    const countValidateResult: ValidateResult = this._filesValidator.validateCount(this._files);
    if (!countValidateResult.isValid)
      throw countValidateResult.error;

    const requiredValidateResult: ValidateResult = this._filesValidator.validateRequired(this._files);
    if (!requiredValidateResult.isValid)
      throw requiredValidateResult.error;

    // return this._files
  }

  private set filesValidator(filesValidator: FilesValidator) {
    this._filesValidator = filesValidator;
  }
  private get filesValidator(): FilesValidator {
    return this._filesValidator;
  }

  private get activeFileInfo(): FileInfo | null {
    return this._activeFileInfo;
  }
  private set activeFileInfo(fileInfo: FileInfo) {
    this._activeFileInfo = fileInfo;
  }

  private addFileInfo(fileInfo: FileInfo) {
    this._filesInfo.push(fileInfo);
  }

  private addFile(): void {
    const fileInfo: FileInfo | null = this.activeFileInfo;
    const validator: FilesValidator = this.filesValidator;
    const name = validator.activeSchema?.key;
    if (fileInfo && name) {
      const fileData: FileData = new FileData(fileInfo);
      if (this._files[name] && this._files[name].length > 0) {
        this._files[name].push(fileData);
      }
      else {
        this._files[name] = [fileData];
      }
    }
  }
}

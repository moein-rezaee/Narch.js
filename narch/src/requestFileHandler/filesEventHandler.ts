import { FilesValidator } from '../validators/filesValidator';
import { FileInfo, ValidateResult } from "../types";

export class FilesEventHandler {
  private _activeFileInfo: FileInfo | null = null;
  private _filesValidator: FilesValidator;

  constructor(filesValidator: FilesValidator) {
    this._filesValidator = filesValidator
  }

  public onReceive(fileInfo: FileInfo): void {
    this.activeFileInfo = fileInfo;
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
  }
  public onClose(files: any): void {
    const countValidateResult: ValidateResult = this._filesValidator.validateCount(files);
    if (!countValidateResult.isValid)
      throw countValidateResult.error;

    const requiredValidateResult: ValidateResult = this._filesValidator.validateRequired(files);
    if (!requiredValidateResult.isValid)
      throw requiredValidateResult.error;
  }

  private get filesValidator(): FilesValidator {
    return this._filesValidator;
  }
  private set filesValidator(filesValidator: FilesValidator) {
    this._filesValidator = filesValidator;
  }

  private get activeFileInfo(): FileInfo | null {
    return this._activeFileInfo;
  }
  private set activeFileInfo(fileInfo: FileInfo) {
    this._activeFileInfo = fileInfo;
  }
}

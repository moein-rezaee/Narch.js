import { FormFilesDecoratorManager } from "../../decorators/formFilesDecorator/manager";
import { FilesCountData, FormFileType, FormFilesDecoratorType, ValidateResult } from "../../types";
import { FilesCountValidator } from "./filesCountValidator";

export class FilesValidator {
    private _schemaValidations: FormFilesDecoratorType | undefined;
    private _activeSchema: FormFileType | undefined;
    constructor(controllerName: string, funcName: string) {
        this._schemaValidations = this.findSchemas(controllerName, funcName);
    }

    public get activeSchema(): FormFileType | undefined {
        return this._activeSchema;
    }
    public set activeSchema(fieldName: string) {
        const schema: FormFileType | undefined = this.getSchema(fieldName);
        if (!schema) throw "schema not found";
        this._activeSchema = schema;
    }

    public validateMimeType(mimeType: string): ValidateResult {
        const validMimeTypes: Array<string> | undefined = this._activeSchema?.validMimeTypes;
        const result: ValidateResult = {
            isValid: true,
            error: `file type must be: ${validMimeTypes?.join(",")}`
        };
        if (!validMimeTypes?.includes(mimeType))
            result.isValid = false;
        return result;
    }
    public validateSize(sizeInByte: number): ValidateResult {
        if (!this._activeSchema)
            return {
                isValid: false,
                error: "schema not found"
            } as ValidateResult;

        const sizeInMb: number = sizeInByte / (1024 * 1024);
        const validSizeInMB: number = this._activeSchema.validSizeInMB;

        const result: ValidateResult = {
            isValid: true,
            error: `file size must be less than ${validSizeInMB}`
        };
        if (sizeInMb > validSizeInMB)
            result.isValid = false;

        return result;
    }
    public validateCount(files: any): ValidateResult {
        const formFiles: Array<FormFileType> = this.schemaValidations?.files ?? [];
        for (let i = 0; i < formFiles.length; i++) {
            const schema: FormFileType = formFiles[i];
            const countValidator: FilesCountValidator = this.getFilesCountValidator(files, schema);
            const validateRsult: ValidateResult = countValidator.validate();
            if (!validateRsult.isValid) return validateRsult;
        }
        return {
            isValid: true
        } as ValidateResult;
    }
    public validateRequired(files: any): ValidateResult {
        const formFiles: Array<FormFileType> = this.schemaValidations?.files ?? [];
        for (let i = 0; i < formFiles.length; i++) {
            const schema: FormFileType = formFiles[i];
            if (this.isRequired(schema) && !this.isExist(files, schema.key)) {
                return {
                    isValid: false,
                    error: `file is required: "${schema.fieldName}"`
                } as ValidateResult;
            }
        }
        
        return {
            isValid: true
        } as ValidateResult;
    }

    private isExist(files: any, key: string): boolean {
        return files[key];
    }

    private get schemaValidations() {
        return this._schemaValidations;
    }
    private isRequired(schema: FormFileType) {
        return !schema.isRequire || (schema.isRequire && schema.isRequire == true)
    }
    private getFilesCountValidator(files: any, schema: FormFileType): FilesCountValidator {
        const filesCountData: FilesCountData = {
            files,
            schema,
            isRequired: this.isRequired(schema)
        }
        return new FilesCountValidator(filesCountData);
    }
    private getSchema(fieldName: string): FormFileType | undefined {
        return this.schemaValidations?.files.find((i: FormFileType) => i.fieldName == fieldName);
    }
    private findSchemas(controllerName: string, funcName: string): FormFilesDecoratorType | undefined {
        const decorators: Array<FormFilesDecoratorType> = FormFilesDecoratorManager.Decorators
        return decorators?.find(
            (i: FormFilesDecoratorType) => i.context.name == controllerName && i.funcName == funcName
        );
    }
}
import { FormFilesDecoratorManager } from "../decorators/formFilesDecorator/manager";
import { FormFileType, FormFilesDecoratorType } from "../types";

export class FilesValidator {
    private _schemaValidations: FormFilesDecoratorType | undefined;
    private _activeSchema: FormFileType | undefined;
    constructor(controllerName: string, funcName: string) {
        this._schemaValidations = this.findSchemas(controllerName, funcName);
    }

    get schemaValidations() {
        return this._schemaValidations;
    }

    get activeSchema() {
        return this._activeSchema;
    }

    public setActiveSchema(fieldName: string) {
        const schema: FormFileType | undefined = this.getSchema(fieldName);
        if (!schema) throw "schema not found";
        this._activeSchema = schema;
    }

    public validateMimeType(mimeType: string): void {
        const validMimeTypes: Array<string> | undefined = this._activeSchema?.validMimeTypes;
        if (!validMimeTypes?.includes(mimeType))
            throw `file type must be: ${validMimeTypes?.join(",")}`
    }

    public validateSize(sizeInByte: number) {
        if (!this._activeSchema) throw "schema not found";
        const sizeInMb: number = sizeInByte / (1024 * 1024);
        const validSizeInMB: number = this._activeSchema.validSizeInMB;
        if (sizeInMb > validSizeInMB)
            throw `file size must be less than ${validSizeInMB}`;
    }

    public validateFilesCount(files: any) {
        this.schemaValidations?.files.forEach((schema: FormFileType) => {
            const validCount = schema.validFilesCount?.value ?? 1;
            const isEqual = schema.validFilesCount?.isEqual ?? true;
            if (validCount < files[schema.key].length)
                throw `files count must be ${isEqual ? `equals to ${validCount}` : `less than ${validCount}`}`;
        });
    }

    public validateFilesRequired(files: any) {
        this.schemaValidations?.files.forEach((schema: FormFileType) => {
            if(this.isRequired(schema)) {
                if(!files[schema.key])
                    throw `file is required: "${schema.fieldName}"`;
            }
        });
    }


    private isRequired(schema: FormFileType) {
        return !schema.isRequire || (schema.isRequire && schema.isRequire == true)
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
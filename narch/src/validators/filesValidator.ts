import { FormFilesDecoratorManager } from "../decorators/formFilesDecorator/manager";
import { FormFilesDecoratorType } from "../types";

export class FilesValidator {
    private _schemaValidations: FormFilesDecoratorType | undefined;
    constructor(controllerName: string, funcName: string) {
        this._schemaValidations = this.find(controllerName, funcName);
    }

    get schemaValidations() {
        return this._schemaValidations;
    }

    private find(controllerName: string, funcName: string): FormFilesDecoratorType | undefined {
        const decorators: Array<FormFilesDecoratorType> = FormFilesDecoratorManager.Decorators
        return decorators?.find(
            (i: FormFilesDecoratorType) => i.context.name == controllerName && i.funcName == funcName
        );
    }
}
import { FormFilesDecoratorType } from "../../types";

export class FormFilesDecoratorManager {
    static Decorators: Array<FormFilesDecoratorType> = [];

    static Add(decorator: FormFilesDecoratorType): void {
        FormFilesDecoratorManager.Decorators.push(decorator);
    }
}

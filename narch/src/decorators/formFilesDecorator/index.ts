import ContextManager from "../../router/contextManager";
import { FormFileType, FormFilesDecoratorType } from "../../types";
import { FormFilesDecoratorManager } from "./manager";
export class FormFilesDecorator {
    static FormFiles(...files: Array<FormFileType>) {
        return function (context: any, funcName: string | symbol) {
            const data: FormFilesDecoratorType = {
                files,
                context: ContextManager.GetInfo(context),
                funcName
            }
            FormFilesDecoratorManager.Add(data);
        }
    }
}
import ContextManager from "../router/contextManager";
import { ModelValidatorType } from "../types";
import { ModelValidatorManager } from "./modelValidatorManager";

export class ModelValidator {
    static Model<T>(model: T, key?: string) {
        return function (context: any, funcName: string | symbol) {
            const data: ModelValidatorType = {
                model,
                key: key ?? camelize((model as any).name),
                context: ContextManager.GetInfo(context),
                funcName
            }
            ModelValidatorManager.Add(data);
        }
    }
}


function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
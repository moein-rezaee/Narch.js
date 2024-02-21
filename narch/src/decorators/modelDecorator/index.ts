import ContextManager from "../../router/contextManager";
import { ModelDecoratorType } from "../../types";
import { ModelDecoratorManager } from "./manager";

export class ModelDecorator {
    static Model<T>(entity: T, key?: string) {
        return function (context: any, funcName: string | symbol) {
            const data: ModelDecoratorType = {
                entity,
                key: key ?? camelize((entity as any).name),
                context: ContextManager.GetInfo(context),
                funcName
            }
            ModelDecoratorManager.Add(data);
        }
    }
}


function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
import { ModelDecoratorType } from "../../types";

export class ModelDecoratorManager {
    static Decorators: Array<ModelDecoratorType> = [];

    static Add(decorator: ModelDecoratorType): void {
        ModelDecoratorManager.Decorators.push(decorator);
    }
}

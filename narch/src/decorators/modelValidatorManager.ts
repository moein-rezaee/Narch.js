import { ModelValidatorType } from "../types";

export class ModelValidatorManager {
    static Decorators: Array<ModelValidatorType> = [];

    static Add(decorator: ModelValidatorType): void {
        ModelValidatorManager.Decorators.push(decorator);
    }
}

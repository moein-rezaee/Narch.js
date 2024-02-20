import { ModelDecoratorType } from "../types";
import { ModelDecoratorManager } from "./modelDecoratorManager";
import { PropValidator } from "./propValidator";

export class ModelValidator {
    private _model: ModelDecoratorType | undefined;
    private _propValidators: any = {};
    constructor(controllerName: string, funcName: string) {
        this._model = this.findModel(controllerName, funcName);
        this.setPropValidators();
    }

    get model(): ModelDecoratorType | undefined {
        return this._model;
    }

    get propValidators(): any {
        return this._propValidators;
    }

    private findModel(controllerName: string, funcName: string): ModelDecoratorType | undefined {
        return ModelDecoratorManager.Decorators?.find(
            (i: ModelDecoratorType) => i.context.name == controllerName && i.funcName == funcName
        )
    }

    private setPropValidators() {
        this.inProps((prop: string, modelInstance: any) => this.addProp(prop, modelInstance));
    }

    addProp(prop: string, modelInstance: any) {
        this._propValidators[prop] = new PropValidator(prop, modelInstance);
    }

    private inProps(callback: Function) {
        if (this.model) {
            const modelInstance = new this.model.entity();
            Object.keys(modelInstance).forEach((prop) => {
                callback(prop, modelInstance);
            });
        }
    }
}
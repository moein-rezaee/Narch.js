import { ModelDecoratorManager } from "../../decorators/modelDecorator/manager";
import { ModelDecoratorType } from "../../types";
import { ModelInitializer } from "./modelInitializer";
import { PropValidator } from "./propValidator";

export class ModelValidator {
    private _model: ModelDecoratorType | undefined;
    private _models: Array<ModelDecoratorType> | undefined;
    private _propValidators: any = {};
    private _modelInstance: any;
    constructor(controllerName: string, funcName: string) {
        this._model = this.findModel(controllerName, funcName);
        this._models = this.findModels(controllerName, funcName);
        if (this._model) {
            this._modelInstance = new this._model.entity();
            this.setPropValidators();
        }
    }

    public getModelInstance(data: any): any {
        if (this._model) {
            const modelInitializer: ModelInitializer = new ModelInitializer(this._propValidators, this._modelInstance);
            return modelInitializer.initialize(data);
        } else return data;
    }

    private findModel(controllerName: string, funcName: string): ModelDecoratorType | undefined {
        const decorators: Array<ModelDecoratorType> = ModelDecoratorManager.Decorators
        return decorators?.find(
            (i: ModelDecoratorType) => i.context.name == controllerName && i.funcName == funcName
        );
    }

    private findModels(controllerName: string, funcName: string): Array<ModelDecoratorType> | undefined {
        const decorators: Array<ModelDecoratorType> = ModelDecoratorManager.Decorators
        return decorators?.filter(
            (i: ModelDecoratorType) => i.context.name == controllerName && i.funcName == funcName
        );
    }

    private setPropValidators() {
        this.inProps((prop: string) => this.addProp(prop));
    }

    private addProp(prop: string) {
        this._propValidators[prop] = new PropValidator(prop, this._modelInstance);
    }

    private inProps(callback: Function) {
        Object.keys(this._modelInstance).forEach((prop) => {
            callback(prop);
        });
    }
}
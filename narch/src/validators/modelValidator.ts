import { ModelDecoratorManager } from "../decorators/modelDecorator/manager";
import { FieldDecoratorType, ModelDecoratorType } from "../types";
import { PropValidator } from "./propValidator";

export class ModelValidator {
    private _model: ModelDecoratorType | undefined;
    private _propValidators: any = {};
    constructor(controllerName: string, funcName: string) {
        this._model = this.findModel(controllerName, funcName);
        this.setPropValidators();
    }

    public validate(data: any) {
        const propValidators = this.propValidators;
        const validatorResult: any = {}
        if (propValidators) {
            Object.keys(propValidators).forEach(prop => {
                const dataValidators: Array<FieldDecoratorType> = propValidators[prop].dataValidator;
                const field = data[prop];
                dataValidators.forEach((dataValidator: FieldDecoratorType) => {
                    let title: string = "";
                    const key = dataValidator.key;
                    if (key == "title") {
                        title = dataValidator.value as string;
                    }
                    else if (key == "compare") {
                        const otherProp: string = dataValidator.validator.otherProp;
                        if (validatorResult[prop]) {
                            validatorResult[prop][key] = dataValidator.validator.validate(field, data[otherProp]);
                        } else {
                            validatorResult[prop] = { [key]: dataValidator.validator.validate(field, data[otherProp]) };
                        }
                    }
                    else {
                        if (validatorResult[prop]) {
                            validatorResult[prop][key] = dataValidator.validator.validate(field);
                        } else {
                            validatorResult[prop] = { [key]: dataValidator.validator.validate(field) };
                        }
                    }
                });
            });
        }
        return validatorResult;
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

    private addProp(prop: string, modelInstance: any) {
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
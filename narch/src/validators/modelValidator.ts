import { ModelDecoratorManager } from "../decorators/modelDecorator/manager";
import { FieldDecoratorType, ModelDecoratorType } from "../types";
import { PropValidator } from "./propValidator";

export class ModelValidator {
    private _model: ModelDecoratorType | undefined;
    private _propValidators: any = {};
    private _modelInstance: any;
    constructor(controllerName: string, funcName: string) {
        this._model = this.findModel(controllerName, funcName);
        if (this._model) {
            this._modelInstance = new this._model.entity()
            this.setPropValidators();
        }
    }

    public validate(data: any): any {
        const validatorResult: any = {}
        const propValidators = this.propValidators;
        if (propValidators) {
            Object.keys(propValidators).forEach(prop => {
                const dataValidators: Array<FieldDecoratorType> = propValidators[prop].dataValidator;
                const field = data[prop];
                this.modelInstance[prop] = field ?? null;

                const titleDecorator: FieldDecoratorType | undefined = dataValidators.find((i: FieldDecoratorType) => i.key == "title");
                let title: string = titleDecorator?.value;
                if (!title || title === "") {
                    title = prop;
                }

                const validators: Array<FieldDecoratorType> = dataValidators.filter((i: FieldDecoratorType) => i.key != "title");
                validators.forEach((dataValidator: FieldDecoratorType) => {
                    dataValidator.validator.title = title;
                    let key = dataValidator.key;
                    if (key == prop) {
                        key = "format";
                    }
                    else if (key == "compare") {
                        const otherProp: string = dataValidator.validator.otherProp;
                        if (validatorResult[prop]) {
                            validatorResult[prop][key] = {
                                result: dataValidator.validator.validate(field, data[otherProp]),
                                errorMessage: dataValidator.validator.message
                            }
                        } else {
                            validatorResult[prop] = {
                                [key]: {
                                    result: dataValidator.validator.validate(field, data[otherProp]),
                                    errorMessage: dataValidator.validator.message
                                }
                            };
                        }
                    }
                    else {
                        if (validatorResult[prop]) {
                            validatorResult[prop][key] = {
                                result: dataValidator.validator.validate(field),
                                errorMessage: dataValidator.validator.message
                            };
                        } else {
                            validatorResult[prop] = {
                                [key]: {
                                    result: dataValidator.validator.validate(field),
                                    errorMessage: dataValidator.validator.message
                                }
                            };
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

    get modelInstance(): any {
        return this._modelInstance;
    }

    get propValidators(): any {
        return this._propValidators;
    }

    private findModel(controllerName: string, funcName: string): ModelDecoratorType | undefined {
        const decorators: Array<ModelDecoratorType> = ModelDecoratorManager.Decorators
        return decorators?.find(
            (i: ModelDecoratorType) => i.context.name == controllerName && i.funcName == funcName
        );
    }

    private setPropValidators() {
        this.inProps((prop: string) => this.addProp(prop));
    }

    private addProp(prop: string) {
        this._propValidators[prop] = new PropValidator(prop, this.modelInstance);
    }

    private inProps(callback: Function) {
        Object.keys(this.modelInstance).forEach((prop) => {
            callback(prop);
        });
    }
}
import { FieldDecoratorType, ValidateObject, ValidateResultType } from "../types";

export class ModelInitializer {
    private _validateResult: any = {};
    private _modelInstance: any;
    private _propValidators: any = {};
    private _modelIsValid: boolean = true;

    constructor(propValidators: any, modelInstance: any) {
        this._propValidators = propValidators;
        this._modelInstance = modelInstance;
    }

    public initialize(data: any): any {
        this.validate(data);
        const modelInitializer: ModelInitializer = this;
        this._modelInstance.getValidateResult = () => modelInitializer.validateResult;
        this._modelInstance.isValid = () => modelInitializer.modelIsValid;
        return this._modelInstance;
    }

    private get validateResult(): any {
        return this._validateResult;
    }

    private get modelIsValid() {
        return this._modelIsValid;
    }

    private validate(data: any): any {
        this.inPropValidators((prop: string, dataValidators: Array<FieldDecoratorType>) => {
            this.setPropValueOfModel(data, prop);

            const title: string = this.getTitleProp(prop, dataValidators);
            const validators: Array<FieldDecoratorType> = this.getDataValidators(dataValidators);

            validators.forEach((dataValidator: FieldDecoratorType) => {
                dataValidator.validator.title = title;

                const validateObject: ValidateObject = {
                    data,
                    prop,
                    dataValidator
                };
                this.addValidateResult(validateObject);
            });
        });
    }

    private inPropValidators(callback: Function) {
        const propValidators = this._propValidators;
        if (propValidators) {
            Object.keys(propValidators).forEach(prop => {
                const dataValidators: Array<FieldDecoratorType> = propValidators[prop].dataValidator;
                if (callback)
                    callback(prop, dataValidators);
            });
        }
    }

    private setPropValueOfModel(data: any, prop: string): void {
        const field = data[prop];
        this._modelInstance[prop] = field ?? null;
    }

    private addValidateResult(validateObject: ValidateObject): void {
        const { prop, dataValidator } = validateObject;

        const key: string = this.getFieldDecoratorKey(dataValidator.key, prop);
        const result = this.getValidateResultAsBool(validateObject);
        const validateResult: ValidateResultType = this.getValidateResult(result, dataValidator.validator.message);

        if (this.validateResultIsExist(prop)) {
            this._validateResult[prop][key] = validateResult;
        } else {
            this._validateResult[prop] = {
                [key]: validateResult
            };
        }
    }

    private getValidateResult(result: boolean, errorMessage: string): ValidateResultType {
        this.setModelValidateResult(result);
        return {
            result,
            errorMessage
        } as ValidateResultType;
    }

    setModelValidateResult(result: boolean) {
        if(this._modelIsValid == true && result == false) this._modelIsValid = false;
    }

    private getValidateResultAsBool(validateObject: ValidateObject): boolean {
        const { data, prop, dataValidator } = validateObject;
        const otherProp = dataValidator.validator?.otherProp;
        if (otherProp) {
            // isCompareValidate
            return dataValidator.validator.validate(data[prop], data[otherProp]);
        } else {
            return dataValidator.validator.validate(data[prop]);
        }
    }

    private validateResultIsExist(prop: string): boolean {
        return this._validateResult[prop];
    }

    private getFieldDecoratorKey(key: string, prop: string) {
        return key == prop ? "format" : key;
    }

    private getTitleProp(prop: string, dataValidators: Array<FieldDecoratorType>) {
        const titleDecorator: FieldDecoratorType | undefined = dataValidators.find((i: FieldDecoratorType) => i.key === "title");
        let title: string = titleDecorator?.value;
        if (!title || title === "")
            title = prop;
        return title;
    }

    private getDataValidators(dataValidators: Array<FieldDecoratorType>) {
        return dataValidators.filter((i: FieldDecoratorType) => i.key !== "title");
    }

}

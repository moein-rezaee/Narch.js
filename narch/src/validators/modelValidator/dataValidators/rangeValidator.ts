import { BaseDataValidator } from "./baseDataValidator";

export class RangeValidator extends BaseDataValidator {
    private _value: any;
    constructor(value: any, message: string) {
        super(message);
        this._value = value;
    }

    get end(): number {
        return this._value.endNum;
    }

    get start(): number {
        return this._value.startNum;
    }

    validate(field?: number): boolean {
        const num = Number(field);
        return Boolean((this.end && this.start) && ((num > this.start) && (this.end > num)));
    }
}

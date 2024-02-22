import { BaseDataValidator } from "./baseDataValidator";

export class CompareValidator extends BaseDataValidator {
    private _otherProp: string = "";
    constructor(otherProp: string, message: string) {
        super(message);
        this._otherProp = otherProp;
    }

    get otherProp(): string {
        return this._otherProp;
    }

    validate(field?: any, otherProp?: any): boolean {
        return Boolean(field === otherProp);
    }
}

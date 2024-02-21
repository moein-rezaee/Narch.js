
export class CompareValidator {
    private _message: string = "";
    private _otherProp: string = "";
    constructor(otherProp: string, message: string) {
        this._message = message;
        this._otherProp = otherProp;
    }

    get message(): string {
        return this._message;
    }

    get otherProp(): string {
        return this._otherProp;
    }

    validate(field?: any, otherProp?: any): boolean {
        return Boolean(field === otherProp);
    }
}

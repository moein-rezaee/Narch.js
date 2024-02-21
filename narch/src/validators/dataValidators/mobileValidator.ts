
export class MobileValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        const MOBILE_REGEX = /^09[0|1|2|3][0-9]{8}$/;
        return field ? MOBILE_REGEX.test(field) : false;
    }
}


export class PostalCodeValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        const POSTALCODE_REGEX = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/;
        return field ? POSTALCODE_REGEX.test(field) : false;
    }
}

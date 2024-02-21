
export class EmailValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return field ? EMAIL_REGEX.test(field) : false;
    }
}

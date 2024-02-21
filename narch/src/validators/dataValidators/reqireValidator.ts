export class RequireValidator {

    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field: any): boolean {
        return Boolean(field && field !== "");
    }
}
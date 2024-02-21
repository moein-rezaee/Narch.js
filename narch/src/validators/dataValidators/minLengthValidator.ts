
export class MinLengthValidator {
    private _message: string = "";
    private minLength: number = 0;
    constructor(minLength: number, message: string) {
        this.minLength = minLength;
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        return Boolean(field && (field.length > this.minLength));
    }
}

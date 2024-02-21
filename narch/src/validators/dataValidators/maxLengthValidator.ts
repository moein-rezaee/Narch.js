
export class MaxLengthValidator {

    private _message: string = "";
    private maxLength: number = 0;
    constructor(maxLength: number, message: string) {
        this.maxLength = maxLength;
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        return Boolean(field && (field.length < this.maxLength));
    }
}

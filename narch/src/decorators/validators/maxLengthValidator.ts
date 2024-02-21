
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

    validate(field?: number): boolean {
        const num = Number(field);
        return Boolean(num && (num < this.maxLength));
    }
}

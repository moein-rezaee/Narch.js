
export class LengthValidator {
    private _message: string = "";
    private strLength: number = 0;
    constructor(strLength: number, message: string) {
        this.strLength = strLength;
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        return Boolean(field && (field.length === this.strLength));
    }
}

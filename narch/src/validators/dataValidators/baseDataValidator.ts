
export class BaseDataValidator {
    protected _message: string = "";
    protected _title: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message.replace("[field]", this._title);
    }

    set title(value: string) {
        this._title = value;
    }
}
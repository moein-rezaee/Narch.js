
export class RangeValidator {
    private _message: string = "";
    private _value: any;
    constructor(value: any, message: string) {
        this._message = message;
        this._value = value;
    }

    get message(): string {
        return this._message;
    }

    get end(): number {
        return this._value.endNum;
    }

    get start(): number {
        return this._value.startNum;
    }

    validate(field?: number): boolean {
        const num = Number(field);
        return Boolean((this.end && this.start) && ((num > this.start) && (this.end > num)));
    }
}

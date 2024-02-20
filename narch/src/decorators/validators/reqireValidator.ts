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

export class MinLengthValidator {
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
        return Boolean(num && (num > this.maxLength));
    }
}

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

export class CompareValidator {
    private _message: string = "";
    private _otherProp: string = "";
    constructor(otherProp: string, message: string) {
        this._message = message;
        this._otherProp = otherProp;
    }

    get message(): string {
        return this._message;
    }

    get otherProp(): string {
        return this._otherProp;
    }

    validate(field?: any, otherProp?: any): boolean {
        return Boolean(field === otherProp);
    }
}

export class EmailValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
        checkMeliCode("09308021771")
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return field ? EMAIL_REGEX.test(field) : false;
    }
}

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

export class UrlValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        return field ? URL_REGEX.test(field) : false;
    }
}

export class MeliCodeValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        return field ? checkMeliCode(field) : false;
    }
}

function checkMeliCode(meli_code: string) {
    if (meli_code.length == 10) {
        if (meli_code == '1111111111' || meli_code == '0000000000' || meli_code == '2222222222' || meli_code == '3333333333' || meli_code == '4444444444' || meli_code == '5555555555' || meli_code == '6666666666' || meli_code == '7777777777' || meli_code == '8888888888' || meli_code == '9999999999') {
            return false;
        }
        const c: number = parseInt(meli_code.charAt(9));
        const n: number = parseInt(meli_code.charAt(0)) * 10 + parseInt(meli_code.charAt(1)) * 9 + parseInt(meli_code.charAt(2)) * 8 + parseInt(meli_code.charAt(3)) * 7 + parseInt(meli_code.charAt(4)) * 6 + parseInt(meli_code.charAt(5)) * 5 + parseInt(meli_code.charAt(6)) * 4 + parseInt(meli_code.charAt(7)) * 3 + parseInt(meli_code.charAt(8)) * 2;
        const r: number = n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
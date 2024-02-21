
export class MeliCodeValidator {
    private _message: string = "";
    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    validate(field?: string): boolean {
        return field ? this.checkFormat(field) : false;
    }

    checkFormat(meli_code: string) {
        if (meli_code.length == 10) {
            if (meli_code == '1111111111' || meli_code == '0000000000' || meli_code == '2222222222' || meli_code == '3333333333' || meli_code == '4444444444' || meli_code == '5555555555' || meli_code == '6666666666' || meli_code == '7777777777' || meli_code == '8888888888' || meli_code == '9999999999') {
                return false;
            }
            const c: number = parseInt(meli_code.charAt(9));
            const n: number = parseInt(meli_code.charAt(0)) * 10 + parseInt(meli_code.charAt(1)) * 9 + parseInt(meli_code.charAt(2)) * 8 + parseInt(meli_code.charAt(3)) * 7 + parseInt(meli_code.charAt(4)) * 6 + parseInt(meli_code.charAt(5)) * 5 + parseInt(meli_code.charAt(6)) * 4 + parseInt(meli_code.charAt(7)) * 3 + parseInt(meli_code.charAt(8)) * 2;
            const strDevRes: string = (n / 11).toString();
            const r: number = n - parseInt(strDevRes) * 11;
            if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

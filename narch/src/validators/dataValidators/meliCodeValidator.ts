
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

    checkFormat(meliCode: string) {
        if (meliCode.length == 10) {
            if (meliCode == '1111111111' || meliCode == '0000000000' || meliCode == '2222222222' || meliCode == '3333333333' || meliCode == '4444444444' || meliCode == '5555555555' || meliCode == '6666666666' || meliCode == '7777777777' || meliCode == '8888888888' || meliCode == '9999999999') {
                return false;
            }
            const c: number = parseInt(meliCode.charAt(9));
            const n: number = parseInt(meliCode.charAt(0)) * 10 + parseInt(meliCode.charAt(1)) * 9 + parseInt(meliCode.charAt(2)) * 8 + parseInt(meliCode.charAt(3)) * 7 + parseInt(meliCode.charAt(4)) * 6 + parseInt(meliCode.charAt(5)) * 5 + parseInt(meliCode.charAt(6)) * 4 + parseInt(meliCode.charAt(7)) * 3 + parseInt(meliCode.charAt(8)) * 2;
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

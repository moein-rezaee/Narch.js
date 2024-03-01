import { BaseDataValidator } from "./baseDataValidator";

export class MobileValidator extends BaseDataValidator {
    constructor(message: string) {
        super(message);
    }

    validate(field?: string): boolean {
        const MOBILE_REGEX = /^09[0|1|2|3][0-9]{8}$/;
        return field ? MOBILE_REGEX.test(field) : false;
    }
}

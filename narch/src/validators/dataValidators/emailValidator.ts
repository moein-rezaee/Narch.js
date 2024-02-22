import { BaseDataValidator } from "./baseDataValidator";

export class EmailValidator extends BaseDataValidator {
    constructor(message: string) {
        super(message);
    }

    validate(field?: string): boolean {
        const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return field ? EMAIL_REGEX.test(field) : false;
    }
}

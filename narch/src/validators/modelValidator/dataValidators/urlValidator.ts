import { BaseDataValidator } from "./baseDataValidator";

export class UrlValidator extends BaseDataValidator {
    constructor(message: string) {
        super(message);
    }

    validate(field?: string): boolean {
        const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        return field ? URL_REGEX.test(field) : false;
    }
}

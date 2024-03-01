import { BaseDataValidator } from "./baseDataValidator";

export class MinLengthValidator extends BaseDataValidator {
    private minLength: number = 0;
    constructor(minLength: number, message: string) {
        super(message);
        this.minLength = minLength;
    }

    validate(field?: string): boolean {
        return Boolean(field && (field.length > this.minLength));
    }
}

import { BaseDataValidator } from "./baseDataValidator";

export class LengthValidator extends BaseDataValidator {
    private strLength: number = 0;
    constructor(strLength: number, message: string) {
        super(message);
        this.strLength = strLength;
    }

    validate(field?: string): boolean {
        return Boolean(field && (field.length === this.strLength));
    }
}

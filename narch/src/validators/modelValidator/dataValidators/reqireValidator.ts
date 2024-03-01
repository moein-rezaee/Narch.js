import { BaseDataValidator } from "./baseDataValidator";

export class RequireValidator extends BaseDataValidator {
    constructor(message: string) {
        super(message);
    }

    validate(field: any): boolean {
        return Boolean(field && field !== "");
    }
}
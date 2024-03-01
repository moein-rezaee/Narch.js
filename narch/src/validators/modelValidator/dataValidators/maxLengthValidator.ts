import { BaseDataValidator } from "./baseDataValidator";

export class MaxLengthValidator  extends BaseDataValidator{
    private maxLength: number = 0;
    constructor(maxLength: number, message: string) {
        super(message);
        this.maxLength = maxLength;
    }
    
    validate(field?: string): boolean {
        return Boolean(field && (field.length < this.maxLength));
    }
}

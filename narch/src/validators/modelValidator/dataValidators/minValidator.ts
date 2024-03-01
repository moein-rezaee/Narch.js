import { BaseDataValidator } from "./baseDataValidator";

export class MinValidator  extends BaseDataValidator{
    private min: number = 0;
    constructor(min: number, message: string) {
        super(message);
        this.min = min;
    }
    
    validate(field?: number): boolean {
        return Boolean(field && (field > this.min));
    }
}

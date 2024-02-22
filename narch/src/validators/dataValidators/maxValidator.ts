import { BaseDataValidator } from "./baseDataValidator";

export class MaxValidator  extends BaseDataValidator{
    private max: number = 0;
    constructor(max: number, message: string) {
        super(message);
        this.max = max;
    }
    
    validate(field?: number): boolean {
        return Boolean(field && (field < this.max));
    }
}

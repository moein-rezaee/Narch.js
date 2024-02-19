import { DataValidator } from "../types";


export class DataValidatorManager {
    static Decorators: Array<DataValidator> = [];

    static Add(decorator: DataValidator): void {
        DataValidatorManager.Decorators.push(decorator);
    }
}

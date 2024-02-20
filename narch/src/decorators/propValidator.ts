import { DataValidatorManager } from "./dataValidatorManager";
import { DataValidator } from "../types";

export class PropValidator {
  dataValidator: Array<DataValidator> = [];
  constructor(prop: string, modelInstance: any) {
    this.setDataValidators(prop, modelInstance);
  }

  setDataValidators(prop: string, modelInstance: any) {
    this.dataValidator = DataValidatorManager.Decorators.filter(
      (i: DataValidator) =>
        i.property === prop &&
        new i.context().constructor === modelInstance.constructor
    );
  }
}

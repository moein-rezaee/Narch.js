import { FieldDecoratorManager } from "../../decorators/fieldDecorator/manager";
import { FieldDecoratorType } from "../../types";

export class PropValidator {
  dataValidator: Array<FieldDecoratorType> = [];
  constructor(prop: string, modelInstance: any) {
    this.setDataValidators(prop, modelInstance);
  }

  setDataValidators(prop: string, modelInstance: any) {
    this.dataValidator = FieldDecoratorManager.Decorators.filter(
      (i: FieldDecoratorType) =>
        i.property === prop &&
        new i.context().constructor === modelInstance.constructor
    );
  }
}

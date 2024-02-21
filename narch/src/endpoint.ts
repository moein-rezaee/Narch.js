import { IEndpoint, IPatternMatcher, IRouter } from "./interfaces.js";
import { FieldDecoratorType, MatchedDetail, MatchedPattern } from "./types.js";
import Router from "./router/index.js";
import { PatternMatcher } from "./router/pattern-handler/patternMatcher";


class Endpoint implements IEndpoint {
  private patternMatcher: IPatternMatcher;
  private matchPattern: MatchedPattern;
  constructor(url: string, method: string) {
    this.patternMatcher = new PatternMatcher(url, method);
    this.matchPattern = this.patternMatcher.findeMatchPattern();
  }

  public execute(data: any = null, files: any = null) {
    const endpoint = this.findMatchEndpoint();
    const values = this.getArgsValue(endpoint.action.args);
    if (data) {

      const propValidators = endpoint.model.propValidators;
      if (propValidators) {
        const validatorResult: any = {}
        Object.keys(propValidators).forEach(prop => {
          const dataValidators: Array<FieldDecoratorType> = propValidators[prop].dataValidator;
          const field = data[prop];
          dataValidators.forEach((dataValidator: FieldDecoratorType) => {
            let title: string = "";
            const key = dataValidator.key;
            if (key == "title") {
              title = dataValidator.value as string;
            }
            else if (key == "compare") {
              const otherProp: string = dataValidator.validator.otherProp;
              if (validatorResult[prop]) {
                validatorResult[prop][key] = dataValidator.validator.validate(field, data[otherProp]);
              } else {
                validatorResult[prop] = { [key]: dataValidator.validator.validate(field, data[otherProp]) };
              }
            }
            else {
              if (validatorResult[prop]) {
                validatorResult[prop][key] = dataValidator.validator.validate(field);
              } else {
                validatorResult[prop] = { [key]: dataValidator.validator.validate(field) };
              }
            }
          });
          // TODO:
          // Add Class for eatch validator like email، require, ...
          // Make Instance in DataValidator Decorators
          // Add ValidateFunction get field and validate it
        });
      }

      return endpoint.action.instance.call(endpoint.context.instance, ...[data, files]);
    } else
      return endpoint.action.instance.call(endpoint.context.instance, ...values);
  }

  private findAllMatches() {
    const { actions } = new Router() as IRouter;
    return actions.filter((i: any) => i.url.pattern == this.matchPattern.value);
  }

  private findMatchEndpoint() {
    const endPoints = this.findAllMatches();
    if (endPoints?.length > 1) {
      throw "more than one end point mathch founded!";
    } else if (endPoints?.length == 1) {
      return endPoints[0];
    }
    throw "some things wrong in find endpoint!";
  }

  private getArgsValue(args: any) {
    const values = [];
    for (let i = 0; i < args?.length ?? 0; i++) {
      const value = this.findeArgValue(args[i]);
      values.push(value);
    }
    return values;
  }

  private findeArgValue(arg: any): string | undefined {
    const dynamic: MatchedDetail | undefined = this.matchPattern.details.dynamics.find(
      (i: any) => i.patternItem.split(":")[1] == arg
    );
    return dynamic?.reqUrlPart;
  }
}

export default Endpoint;

import { IEndpoint, IPatternMatcher, IRouter } from "./interfaces.js";
import { DataValidator, MatchedDetail, MatchedPattern } from "./types.js";
import Router from "./router/index.js";
import { PatternMatcher } from "./router/pattern-handler/patternMatcher";
import { DataValidatorManager } from "./decorators/dataValidatorManager.js";


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

      const modelInstance = endpoint.model.entity();
      Object.keys(endpoint.dataValidators).forEach(prop => {
          const validator = endpoint.dataValidators[prop];
          const field = data[prop];
          // TODO:
          // Add Class for eatch validator like email، require, ...
          // Make Instance in DataValidator Decorators
          // Add ValidateFunction get field and validate it
      })

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

const Router = require("./router/index");
const PatternMatcher = require("./router/pattern-handler/patternMatcher");

class Endpoint {
  patternMatcher;
  matchPattern;
  constructor(url, method) {
    this.patternMatcher = new PatternMatcher(url, method);
  }

  findAllMatches() {
    this.matchPattern = this.patternMatcher.findeMatchPattern();
    const { actions } = new Router();
    return actions.filter((i) => i.url.pattern == this.matchPattern.value);
  }

  findMatchEndpoint() {
    const endPoints = this.findAllMatches();
    if (endPoints?.length > 1) {
      throw "more than one end point mathch founded!";
    } else if (endPoints?.length == 1) {
      return endPoints[0];
    }
    throw "some things wrong in find endpoint!";
  }

  execute() {
    const endpoint = this.findMatchEndpoint();
    const values = this.getArgsValue(endpoint.action.args);
    //TODO: if parameter is number send number to user
    return endpoint.action.instance.call(endpoint.context.instance, ...values);
  }

  getArgsValue(args) {
    const values = [];
    for (let i = 0; i < args?.length ?? 0; i++) {
      const value = this.findeArgValue(args[i]);
      values.push(value);
    }
    return values;
  }

  findeArgValue(arg) {
    const dynamic = this.matchPattern.details.dynamics.find(
      (i) => i.patternItem.split(":")[1] == arg
    );
    return dynamic.reqUrlPart;
  }
}

export default Endpoint;

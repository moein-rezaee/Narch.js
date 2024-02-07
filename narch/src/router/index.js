const ActionRouter = require("./actionRouter");
const ControllerRouter = require("./controllerRouter");

module.exports = class Router {
  static RoutesData = [];
  constructor() {
    if (Router.RoutesData.length > 0) return Router.RoutesData;
    return this.init();
  }

  init() {
    Router.RoutesData.controllers = [];
    Router.RoutesData.actions = [];
    Router.RoutesData.patterns = [];
    this.generate();
    return Router.RoutesData;
  }

  generate() {
    const controllerRouter = new ControllerRouter();
    const actionRouter = new ActionRouter();
    controllerRouter.generate((controllerRoute) => {
      this.addController(controllerRoute);
      actionRouter.generate(controllerRoute, (route) => {
        this.addAction(route);
        this.addPattern(route.url.pattern);
      });
    });
  }

  addController(route) {
    Router.RoutesData.controllers.push(route);
  }

  addAction(route) {
    Router.RoutesData.actions.push(route);
  }

  addPattern(pattern) {
    const patternObject = this.getPatternObject(pattern);
    Router.RoutesData.patterns.push(patternObject);
  }
  
  getPatternObject(pattern) {
    const patternParts = pattern.split("|");
    return{
      method: patternParts[0],
      parts: patternParts[1].split("/"),
      value: pattern
    };
  }
};

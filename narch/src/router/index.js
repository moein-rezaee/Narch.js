const ActionRouter = require("./actionRouter");
const ControllerRouter = require("./controllerRouter");

module.exports = class Router {
  router = [];
  patterns = [];
  constructor() {
    this.generate();
  }

  generate() {
    const controllerRouter = new ControllerRouter();
    const actionRouter = new ActionRouter();
    controllerRouter.generate((controllerRoute) => {
      this.addController(controllerRoute);
      actionRouter.generate(controllerRoute, (route) => this.addAction(route));
    });
  }

  addController(route) {
    this.router.push(route);
  }

  addAction(route) {
    this.router.push(route);
    this.patterns.push(route.url.pattern);
  }
};

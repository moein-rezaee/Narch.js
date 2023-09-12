const ActionRouter = require("./actionRouter");
const ControllerRouter = require("./controllerRouter");

module.exports = class Router {
  router = [];
  constructor() {
    this.generate();
  }

  generate() {
    const controllerRouter = new ControllerRouter();
    const actionRouter = new ActionRouter();
    controllerRouter.generate((controllerRoute) => {
      this.add(controllerRoute);
      actionRouter.generate(controllerRoute, (route) => this.add(route));
    });
  }

  add(route) {
    this.router.push(route);
  }
};

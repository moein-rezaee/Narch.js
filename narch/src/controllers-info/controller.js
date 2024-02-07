const Methods = require("./methods");
const CONTROLLER_PATH = "../../dist";

module.exports = class Controller {
  info(controllerName) {
    const name = this.name(controllerName);
    const instance = this.instance(controllerName);
    const methods = this.methods(instance);
    return {
      name,
      instance,
      methods,
    };
  }

  name(controllerName) {
    const index = controllerName.indexOf("Controller");
    return controllerName.slice(0, index);
  }

  instance(controllerName) {
    const controllerPath = this.path(controllerName);
    const Controller = require(controllerPath);
    return new Controller();
  }

  path(controllerName) {
    return `${CONTROLLER_PATH}/${controllerName}/index.js`;
  }

  methods(instance) {
    const methods = new Methods();
    return methods.toObject(instance);
  }
}

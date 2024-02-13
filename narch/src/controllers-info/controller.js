const Methods = require("./methods");
const { AppConfig } = require("../appConfig");
const CONTROLLER_PATH = "../src/controllers";
const path = require("path");

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
    const config = AppConfig.Get();
    return path.join(
      config.appRoot,
      `/${CONTROLLER_PATH}/${controllerName}/index.ts`
    );
  }

  methods(instance) {
    const methods = new Methods();
    return methods.toObject(instance);
  }
};

const ActionUrlGenerator = require("./url-generator/actionUrlGenerator");
const { HttpMethods } = require("../decorators/httpMethods");
const { DataValidatorManager } = require("../decorators/dataValidatorManager");
const {
  ModelDecoratorManager,
} = require("../decorators/modelDecoratorManager");
module.exports = class ActionRouter {
  generate(controllerRoute, func) {
    this.foreach(
      controllerRoute.controller,
      (action, { model, routerMethod, dataValidators }) => {
        const info = {
          decorator: routerMethod,
          model,
          dataValidators,
          controllerRoute,
          action,
        };
        const route = this.route(info);
        if (func) func(route);
      }
    );
  }

  foreach(controller, func) {
    const { methods } = controller;
    for (const name in methods) {
      if (name == "constructor") continue;
      const method = methods[name];
      const routerMethod = this.decorator(controller.name, name);
      const model = this.model(controller.name, name);
      const dataValidators = this.dataValidators(model);
      if (func) func(method, { model, routerMethod, dataValidators });
    }
  }

  route(info) {
    const { controllerRoute, action, decorator, model, dataValidators } = info;
    const url = this.url(info);
    return {
      isController: false,
      context: controllerRoute.controller,
      method: decorator?.method ?? "GET",
      decorator,
      model,
      dataValidators,
      action,
      url,
    };
  }

  decorator(controllerName, funcName) {
    return (
      HttpMethods.Decorators?.find(
        (i) => i.context.name == controllerName && i.name == funcName
      ) ?? null
    );
  }

  model(controllerName, funcName) {
    return (
      ModelDecoratorManager.Decorators?.find(
        (i) => i.context.name == controllerName && i.funcName == funcName
      ) ?? null
    );
  }

  dataValidators(model) {
    const list = {};
    if (model) {
      const modelInstance = new model.entity();
      Object.keys(modelInstance).forEach((prop) => {
        list[prop] = DataValidatorManager.Decorators.filter(
          (i) => i.property === prop && new i.context().constructor === modelInstance.constructor
        );
      });
    }
    return list;
  }

  dataValidator(controllerName, funcName) {
    return (
      ModelDecoratorManager.Decorators?.find(
        (i) => i.context.name == controllerName && i.funcName == funcName
      ) ?? null
    );
  }

  url(info) {
    const urlGenerator = new ActionUrlGenerator(info);
    return urlGenerator.generate();
  }
};

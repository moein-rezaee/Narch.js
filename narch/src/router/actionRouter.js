const ActionUrlGenerator = require("./url-generator/actionUrlGenerator");
const { HttpMethods } = require("../decorators/httpMethods");
const { ModelValidator } = require("../decorators/modelValidator");
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
      if (func) func(method, { model, routerMethod });
    }
  }

  route(info) {
    const { controllerRoute, action, decorator, model } = info;
    const url = this.url(info);
    return {
      isController: false,
      context: controllerRoute.controller,
      method: decorator?.method ?? "GET",
      decorator,
      model,
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
    return new ModelValidator(controllerName, funcName)
  }

  url(info) {
    const urlGenerator = new ActionUrlGenerator(info);
    return urlGenerator.generate();
  }
};



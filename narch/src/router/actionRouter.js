const ActionUrlGenerator = require("./url-generator/actionUrlGenerator");
const { RouterDecoratorManager } = require("../decorators/routerDecorator/manager");
const { ModelValidator } = require("../validators/modelValidator");
module.exports = class ActionRouter {
  generate(controllerRoute, func) {
    this.foreach(controllerRoute.controller, (action, { modelValidator, routerMethod }) => {
        const info = {
          decorator: routerMethod,
          modelValidator,
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
      const modelValidator = this.model(controller.name, name);
      if (func) func(method, { modelValidator, routerMethod });
    }
  }

  route(info) {
    const { controllerRoute, action, decorator, modelValidator } = info;
    const url = this.url(info);
    return {
      isController: false,
      context: controllerRoute.controller,
      method: decorator?.method ?? "GET",
      decorator,
      modelValidator,
      action,
      url,
    };
  }

  decorator(controllerName, funcName) {
    return (
      RouterDecoratorManager.Decorators?.find(
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



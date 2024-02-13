const ActionUrlGenerator = require("./url-generator/actionUrlGenerator");
const { HttpMethods } = require("../decorators/httpMethods");

module.exports = class ActionRouter {
  generate(controllerRoute, func) {
    this.foreach(controllerRoute.controller, (action, actionDecorator) => {
      const info = {
        decorator: actionDecorator,
        controllerRoute,
        action,
      };
      const route = this.route(info);
      if (func) func(route);
    });
  }

  foreach(controller, func) {
    const { methods } = controller;
    for (const name in methods) {
      if (name == "constructor") continue;
      const method = methods[name];
      const decorator = this.decorator(controller.name, name);
      if (func) func(method, decorator);
    }
  }

  route(info) {
    const { controllerRoute, action, decorator } = info;
    const url = this.url(info);
    return {
      isController: false,
      context: controllerRoute.controller,
      method: decorator?.method ?? "GET",
      decorator,
      action,
      url,
    };
  }

  decorator(controllerName, name) {
    return (
      HttpMethods.Decorators?.find(
        (i) => i.context.name == controllerName && i.name == name
      ) ?? null
    );
  }

  url(info) {
    const urlGenerator = new ActionUrlGenerator(info);
    return urlGenerator.generate();
  }
};

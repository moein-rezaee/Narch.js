import { ModelValidator } from './../validators/modelValidator';
import { Action, RouterMethod } from "../types";

const ActionUrlGenerator = require("./url-generator/actionUrlGenerator");
const { RouterDecoratorManager } = require("../decorators/routerDecorator/manager");
module.exports = class ActionRouter {
  generate(controllerRoute: any, func: Function) {
    this.foreach(controllerRoute.controller, (action: any, { modelValidator, routerMethod }: any) => {
      const info = {
        decorator: routerMethod,
        modelValidator,
        controllerRoute,
        action,
      };
      const route = this.route(info);
      if (func) func(route);
    });
  }

  foreach(controller: any, func: Function) {
    const { methods } = controller;
    for (const name in methods) {
      if (name == "constructor") continue;
      const method = methods[name];
      const routerMethod: RouterMethod = this.decorator(controller.name, name);
      const modelValidator: ModelValidator = this.model(controller.name, name);
      if (func) func(method, { modelValidator, routerMethod });
    }
  }

  route(info: any) {
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
    } as Action;
  }

  decorator(controllerName: string, funcName: string): RouterMethod {
    return RouterDecoratorManager.Decorators?.find(
      (i: RouterMethod) => i.context.name == controllerName && i.name == funcName
    ) ?? null;
  }

  model(controllerName: string, funcName: string): ModelValidator {
    return new ModelValidator(controllerName, funcName)
  }

  url(info: any) {
    const urlGenerator = new ActionUrlGenerator(info);
    return urlGenerator.generate();
  }
};

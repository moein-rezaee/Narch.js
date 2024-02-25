import { ModelValidator } from './../validators/modelValidator';
import { Action, RouterMethod } from "../types";
import { FilesValidator } from '../validators/filesValidator';

const ActionUrlGenerator = require("./url-generator/actionUrlGenerator");
const { RouterDecoratorManager } = require("../decorators/routerDecorator/manager");
export class ActionRouter {
  generate(controllerRoute: any, func: Function) {
    this.foreach(controllerRoute.controller, (action: any, { modelValidator, routerMethod, filesValidator }: any) => {
      const info = {
        decorator: routerMethod,
        modelValidator,
        filesValidator,
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
      const filesValidator: FilesValidator = this.filesValidator(controller.name, name);
      if (func) func(method, { modelValidator, routerMethod, filesValidator });
    }
  }

  route(info: any) {
    const { controllerRoute, action, decorator, modelValidator, filesValidator } = info;
    const url = this.url(info);
    return {
      isController: false,
      context: controllerRoute.controller,
      method: decorator?.method ?? "GET",
      decorator,
      modelValidator,
      filesValidator,
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

  filesValidator(controllerName: string, funcName: string): FilesValidator {
    return new FilesValidator(controllerName, funcName)
  }

  url(info: any) {
    const urlGenerator = new ActionUrlGenerator(info);
    return urlGenerator.generate();
  }
};

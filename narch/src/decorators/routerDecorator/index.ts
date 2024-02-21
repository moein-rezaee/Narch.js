import ContextManager from "../../router/contextManager.js";
import { RouterMethod } from "../../types.js";
import { RouterDecoratorManager } from "./manager.js";

export class RouterDecorator {
  static Route(pattern: string): Function {
    return function (context: Function): void {
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "ROUTE",
        name: undefined,
        url: pattern,
      };
      RouterDecoratorManager.Add(decorator);
    };
  }

  static Get(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "GET",
        name: funcName,
        url: pattern,
      };
      RouterDecoratorManager.Add(decorator);
    };
  }

  static Put(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "PUT",
        name: funcName,
        url: pattern,
      };
      RouterDecoratorManager.Add(decorator);
    };
  }

  static Post(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "POST",
        name: funcName,
        url: pattern,
      };
      RouterDecoratorManager.Add(decorator);
    };
  }

  static Delete(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "DELETE",
        name: funcName,
        url: pattern,
      };
      RouterDecoratorManager.Add(decorator);
    };
  }
}
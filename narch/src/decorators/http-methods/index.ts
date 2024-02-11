import { Decorator } from "../../types.js";
import ContextManager from "./contextManager.js";

abstract class HttpMethods {
  static Decorators: Array<Decorator> = [];

  static Add(decorator: Decorator): void {
    HttpMethods.Decorators.push(decorator);
  }
}

export abstract class RouterMethods {
  static Route(pattern: string): Function {
    return function (context: Function): void {
      const decorator: Decorator = {
        context: ContextManager.GetInfo(context),
        method: "ROUTE",
        name: undefined,
        url: pattern,
      };
      HttpMethods.Add(decorator);
    }
  }

  static Get(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: Decorator = {
        context: ContextManager.GetInfo(context),
        method: "GET",
        name: funcName,
        url: pattern,
      };
      HttpMethods.Add(decorator);
    };
  }

  static Put(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: Decorator = {
        context: ContextManager.GetInfo(context),
        method: "PUT",
        name: funcName,
        url: pattern,
      };
      HttpMethods.Add(decorator);
    };
  }

  static Post(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: Decorator = {
        context: ContextManager.GetInfo(context),
        method: "POST",
        name: funcName,
        url: pattern,
      };
      HttpMethods.Add(decorator);
    };
  }

  static Delete(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      const decorator: Decorator = {
        context: ContextManager.GetInfo(context),
        method: "DELETE",
        name: funcName,
        url: pattern,
      };
      HttpMethods.Add(decorator);
    };
  }
}

export default {
  HttpMethods,
  RouterMethods
}
import ContextManager from "../router/contextManager.js";
import { RouterMethod } from "../types.js";
import { HttpMethods } from "./httpMethods.js";

export class RouterMethods {
  static Route(pattern: string): Function {
    return function (context: Function): void {
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "ROUTE",
        name: undefined,
        url: pattern,
      };
      HttpMethods.Add(decorator);
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
      HttpMethods.Add(decorator);
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
      HttpMethods.Add(decorator);
    };
  }

  static Post(pattern: string = ""): Function {
    return function (context: any, funcName: string, descriptor: PropertyDescriptor): void {
      type ArgumentTypes = Parameters<typeof descriptor.value>;
      const decorator: RouterMethod = {
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
      const decorator: RouterMethod = {
        context: ContextManager.GetInfo(context),
        method: "DELETE",
        name: funcName,
        url: pattern,
      };
      HttpMethods.Add(decorator);
    };
  }
}




// // Define a sample function
// function exampleFunction(arg1: string, arg2:
// 	number, arg3: boolean): void {
// 	// Function body
// }

// type ArgumentTypes = Parameters<typeof exampleFunction>;

// function logArgumentTypes(...args: ArgumentTypes):
// 	void {
// 	// Log the type of each argument
// 	args.forEach(arg => console.log(typeof arg));
// }

// const args: ArgumentTypes = ['Geeks', 22, true];
// logArgumentTypes(...args);

import { RouterMethod } from "../types.js";

export class HttpMethods {
  static Decorators: Array<RouterMethod> = [];

  static Add(decorator: RouterMethod): void {
    HttpMethods.Decorators.push(decorator);
  }
}
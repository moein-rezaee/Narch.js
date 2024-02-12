import { Decorator } from "../types.js";

module.exports = class HttpMethods {
  static Decorators: Array<Decorator> = [];

  static Add(decorator: Decorator): void {
    HttpMethods.Decorators.push(decorator);
  }
}
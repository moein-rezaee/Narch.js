import { Decorator } from "../types.js";

export class HttpMethods {
  static Decorators: Array<Decorator> = [];

  static Add(decorator: Decorator): void {
    HttpMethods.Decorators.push(decorator);
  }
}
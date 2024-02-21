import { RouterMethod } from "../../types";

export class RouterDecoratorManager {
  static Decorators: Array<RouterMethod> = [];

  static Add(decorator: RouterMethod): void {
    RouterDecoratorManager.Decorators.push(decorator);
  }
}
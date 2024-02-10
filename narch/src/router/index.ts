import { IRouter } from "../interfaces";
import { Pattern, RoutesData } from "../types";

const ActionRouter = require("./actionRouter");
const ControllerRouter = require("./controllerRouter");


export default class Router implements IRouter {
  static Insatnce: any;
  private list: RoutesData = {
    actions: [],
    controllers: [],
    patterns: [],
  };
  constructor() {
    if (Router.Insatnce) return Router.Insatnce;
    this.generate();
    Router.Insatnce = this;
  }

  public get routesData(): RoutesData {
    return this.list;
  }

  public get actions(): Array<any> {
    return this.list.actions;
  }

  public get controllers(): Array<any> {
    return this.list.controllers;
  }

  public get patterns(): Array<Pattern> {
    return this.list.controllers;
  }

  private generate() {
    const controllerRouter = new ControllerRouter();
    const actionRouter = new ActionRouter();
    controllerRouter.generate((controllerRoute: any) => {
      this.addController(controllerRoute);
      actionRouter.generate(controllerRoute, (route: any) => {
        this.addAction(route);
        this.addPattern(route.url.pattern);
      });
    });
  }

  private addController(controller: any) {
    this.list.controllers.push(controller);
  }

  private addAction(actions: any) {
    this.list.actions.push(actions);
  }

  private addPattern(pattern: string) {
    const patternObject: Pattern = this.getPatternObject(pattern);
    this.list.patterns.push(patternObject);
  }

  private getPatternObject(pattern: string): Pattern {
    const patternParts = pattern.split("|");
    return {
      method: patternParts[0],
      parts: patternParts[1].split("/"),
      value: pattern
    } as Pattern;
  }
}
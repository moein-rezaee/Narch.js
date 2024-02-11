import { ContextInfo } from "../../types.js";
export default class ContextManager {
  context: any;
  constructor(context: any) {
    this.context = context;
  }

  static GetInfo(context: any): ContextInfo {
    const contextManager = new ContextManager(context);
    return contextManager.info();
  }

  info(): ContextInfo {
    const type = this.type();
    const fileName = this.fileName(type);
    const name = this.name(fileName);
    return {
      name,
      fileName,
      type,
      instance: this.context,
    } as ContextInfo;
  }

  private type(): string {
    const contextType = typeof this.context;
    return contextType == "function" ? "class" : "instanceOfClass";
  }

  private name(fileName: string): string {
    return fileName.split("Controller")[0];
  }

  private fileName(type: string): string {
    const isClass = type == "class";
    if (isClass) {
      return this.context.name;
    } else {
      return this.context.constructor.name;
    }
  }
}

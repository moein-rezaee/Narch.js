module.exports = class ContextManager {
  context;
  constructor(context) {
    this.context = context;
  }

  info() {
    const type = this.type();
    const fileName = this.fileName(type);
    const name = this.name(fileName);
    return {
      name,
      fileName,
      type,
      instance: this.context,
    };
  }

  type() {
    const contextType = typeof this.context;
    return contextType == "function" ? "class" : "instanceOfClass";
  }

  name(fileName) {
    return fileName.split("Controller")[0];
  }

  fileName(type) {
    const isClass = type == "class";
    if (isClass) {
      return this.context.name;
    } else {
      return this.context.constructor.name;
    }
  }
}

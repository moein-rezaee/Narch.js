const Method = require("./method");

module.exports = class Methods {
  toArray(instance) {
    const prototypes = Object.getPrototypeOf(instance);
    return Object.getOwnPropertyNames(prototypes);
  }

  method(context, name) {
    const method = new Method();
    method.toObject(context, name);
  }

  toObject(context) {
    const methods = {};
    const methodsName = this.toArray(context);
    methodsName.forEach((name) => {
      methods[name] = this.method(context, name);
    });
    return methods;
  }
}

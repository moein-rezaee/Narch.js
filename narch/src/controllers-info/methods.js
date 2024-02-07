const Method = require("./method");

module.exports = class Methods {
  getNames(instance) {
    const prototypes = Object.getPrototypeOf(instance);
    return Object.getOwnPropertyNames(prototypes);
  }

  method(context, name) {
    const method = new Method();
    return method.toObject(context, name);
  }

  toObject(context) {
    const methods = {};
    const names = this.getNames(context);
    names.forEach((name) => {
      methods[name] = this.method(context, name);
    });
    return methods;
  }
}

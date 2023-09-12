const Args = require("./args");

module.exports = class Method {
  args(instance) {
    const args = new Args();
    return args.getNames(instance);
  }

  instance(context, name) {
    return context[name];
  }

  toObject(context, name) {
    const instance = this.instance(context, name);
    const args = this.args(instance);
    return {
      instance,
      args,
      name
    };
  }
}

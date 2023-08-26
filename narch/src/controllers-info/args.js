module.exports = class Args {
  clean(args) {
    return args.length == 1 && args[0] == "" ? null : args;
  }

  toArrayFromString(args) {
    return args.trim().split(",");
  }

  getString(method) {
    const strMethod = method.toString();
    const startIndex = strMethod.indexOf("(") + 1;
    const endIndex = strMethod.indexOf(")");
    return strMethod.slice(startIndex, endIndex);
  }

  toArray(method) {
    const strArgs = this.getString(method);
    const args = this.toArrayFromString(strArgs);
    return this.clean(args);
  }
}

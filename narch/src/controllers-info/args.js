module.exports = class Args {
  clean(args) {
    return args.length == 1 && args[0] == "" ? null : args;
  }

  getNamesFromString(args) {
    return args.trim().split(",");
  }

  getNamesToString(method) {
    const strMethod = method.toString();
    const startIndex = strMethod.indexOf("(") + 1;
    const endIndex = strMethod.indexOf(")");
    return strMethod.slice(startIndex, endIndex);
  }

  getNames(method) {
    const strNames = this.getNamesToString(method);
    const names = this.getNamesFromString(strNames);
    return this.clean(names);
  }
}

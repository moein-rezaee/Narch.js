const BaseUrlParser = require("./baseUrlParser");
const { action } = require("./config");

module.exports = class ActionUrlParser extends BaseUrlParser {
  decorator;
  controllerRoute;
  constructor(info) {
    const { decoratedUrl, decorator, controllerRoute } = info;
    super(decoratedUrl, action.formats);
    this.controllerRoute = controllerRoute;
    this.decorator = decorator;
  }

  run() {
    return super.run(this);
  }

  getName() {
    return this.decorator.name;
  }

  getControllerPattern() {
    const { pattern } = this.controllerRoute.url;
    return this.getCleanPattern(pattern);
  }

  getCleanPattern(pattern) {
    const hasSlash = this.hasSlash(pattern);
    if (hasSlash) return this.removeFirstSlash(pattern);
    return pattern;
  }

  removeFirstSlash(pattern) {
    return pattern.substring(1, pattern.length);
  }

  hasSlash(pattern) {
    const char = pattern.substring(0, 1);
    return char === "/";
  }

  getNewName(item, isAction = true) {
    if (isAction) {
      return this.splitNameFromAction(item);
    } else {
      return this.splitNameFromController(item);
    }
  }

  splitNameFromController(item) {
    const lastIndex = item.length - 1;
    return item.slice(12, lastIndex);
  }

  splitNameFromAction(item) {
    const lastIndex = item.length - 1;
    return item.slice(8, lastIndex);
  }

  changeName(item, isAction = true) {
    const name = this.getNewName(item, isAction);
    const index = this.getIndex(item);
    this.route[index] = name;
  }

  // [controller]
  // controllerPattern
  // نام کنتلر باید جایگزین شود
  setController(item) {
    const index = this.getIndex(item);
    this.route[index] = this.getControllerPattern();
  }

  // [controller=*]
  //نام جاری باید با نام کنترلر جایگزین شود
  changeController(item) {
    const IS_ACTION = false;
    this.changeName(item, IS_ACTION);
  }

  // [action]
  // نام اکشن باید در روت جایگزین شود
  setDefault(item) {
    const index = this.getIndex(item);
    this.route[index] = this.getName();
  }

  // [action=*]
  // نام جاری باید با نام اکشن جایگزین شود
  changeDefault(item) {
    this.changeName(item);
  }

  // :*
  // setDaynamicParam(item) {
  //   console.log(item);
  // }
};

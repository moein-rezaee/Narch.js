const DecoratedUrlParser = require("./decoratedUrlParser");
const { action } = require("./url-parser.config");

module.exports = class ActionUrlParser extends DecoratedUrlParser {
  decorator;
  constructor(decoratedUrl, decorator) {
    super(decoratedUrl, action.formats);
    this.decorator = decorator;
  }

  run() {
    return super.run(this);
  }

  getName() {
    return this.decorator.name;
  }

  getNewName(item) {
    return item.split("action=")[1];
  }

  // [controller]
  // نام کنتلر باید جایگزین شود
  setController() {}

  // [controller=*]
  //نام جاری باید با نام کنترلر جایگزین شود
  changeController() {}

  // [action]
  // نام اکشن باید در روت جایگزین شود
  setDefault() {
    const index = this.getIndex(item);
    this.route[index] = this.getName();
  }

  // [action=*]
  // نام جاری باید با نام اکشن جایگزین شود
  changeDefault() {
    const name = this.getNewName(item);
    const index = this.getIndex(item);
    this.route[index] = name;
  }

  // :*
  setDaynamicParam() {}
};

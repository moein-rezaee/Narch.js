const BaseUrlParser = require("./baseUrlParser");
const { controller } = require("./config");

module.exports = class ControllerUrlParser extends BaseUrlParser {
  decorator;
  constructor(decoratedUrl, decorator) {
    super(decoratedUrl, controller.formats);
    this.decorator = decorator;
  }

  run() {
    return super.run(this);
  }

  getName() {
    return this.decorator.context.name;
  }

  // split name from [controller=*] template
  getNewName(item) {
    const lastIndex =item.length - 1;
    return item.slice(12, lastIndex);
  }

  // [controller]
  // استفاده از نام پیشفرض کنترلر
  setDefault(item) {
    const index = this.getIndex(item);
    this.route[index] = this.getName();
  }
  // [controller=*]
  // چایگزین نام وارد شده به جای نام پیشفرض کنترلر
  changeDefault(item) {
    const name = this.getNewName(item);
    const index = this.getIndex(item);
    this.route[index] = name;
  }

  // [action]
  // نام اکشن باید در تک تک روت های کنترلر اعمال شود
  // setAction() {}
};

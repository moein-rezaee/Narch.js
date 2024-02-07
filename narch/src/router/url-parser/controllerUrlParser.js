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

  getNewName(item) {
    return item.split("controller=")[1];
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

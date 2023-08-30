const ControllerUrlParser = require("./controllerUrlParser");
const ActionUrlParser = require("./actionUrlParser");

module.exports = class UrlParser {
  decoratedUrl;
  decorator;
  constructor(decoratedUrl, decorator) {
    this.decoratedUrl = decoratedUrl;
    this.decorator = decorator;
  }

  parse() {
    if(!this.decorator) return null;
    const parser = this.getParser();
    return parser.run();
  }

  getParser() {
    let parser = null;
    const { decorator, decoratedUrl } = this;
    const isController = this.isController();
    if (isController) {
      parser = new ControllerUrlParser(decoratedUrl, decorator);
    } else {
      parser = new ActionUrlParser(decoratedUrl, decorator);
    }
    return parser;
  }

  isController() {
    return this.decorator.context.type == "class";
  }
}

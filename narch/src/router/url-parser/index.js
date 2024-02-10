const ControllerUrlParser = require("./controllerUrlParser");
const ActionUrlParser = require("./actionUrlParser");

export default class UrlParser {
  info;
  constructor(info) {
    this.info = info;
  }

  hasDecorator() {
    return this.info.decorator ? true : false;
  }

  parse() {
    if (!this.hasDecorator()) return null;
    const parser = this.getParser();
    return parser.run();
  }

  getParser() {
    let parser = null;
    const isController = this.isController();
    if (isController) {
      parser = this.getControllerUrlParser();
    } else {
      parser = this.getActionUrlParser();
    }
    return parser;
  }

  getControllerUrlParser() {
    const { decorator, decoratedUrl } = this.info;
    return new ControllerUrlParser(decoratedUrl, decorator);
  }

  getActionUrlParser() {
    return new ActionUrlParser(this.info);
  }

  isController() {
    const { decorator } = this.info;
    return decorator.context.type == "class";
  }
};

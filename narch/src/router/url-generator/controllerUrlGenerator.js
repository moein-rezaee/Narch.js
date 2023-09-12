const UrlParser = require("../url-parser");

module.exports = class ControllerUrlGenerator {

  generate(decorator, controller) {
    const defaultUrl = this.default(controller);
    const decoratedUrl = this.decorated(decorator);
    const pattern = this.pattern(decoratedUrl, decorator);
    return {
      default: defaultUrl,
      decorated: decoratedUrl,
      pattern,
    };
  }

  default(controller) {
    return controller.name;
  }

  decorated(decorator) {
    return decorator ? decorator.url : null;
  }

  pattern(decoratedUrl, decorator) {
    const parser = new UrlParser({ decoratedUrl, decorator });
    return parser.parse();
  }
};

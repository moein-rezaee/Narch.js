const UrlParser = require("../url-parser");
const PatternMaker = require("../pattern-handler/patternMaker");
module.exports = class ActionUrlGenerator {
  info;
  action;
  controllerRoute;
  decorator;
  constructor(info) {
    this.info = info;
    this.action = info.action;
    this.controllerRoute = info.controllerRoute;
    this.decorator = info.decorator;
  }

  generate() {
    const defaultUrl = this.default();
    const decoratedUrl = this.decorated();
    const pattern = this.pattern(decoratedUrl);
    return {
      default: defaultUrl,
      decorated: decoratedUrl,
      pattern,
    };
  }

  default() {
    return `/${this.action.name}`;
  }

  decorated() {
    const hasDecoratedUrl = this.hasDecoratedUrl();
    return hasDecoratedUrl ? `/${this.decorator.url}` : null;
  }

  hasDecoratedUrl() {
    return this.decorator && this.decorator.url;
  }

  pattern(decoratedUrl) {
    const parsedUrl = this.parsePattern(decoratedUrl);
    return this.makePayttern(decoratedUrl, parsedUrl);
  }

  parsePattern(decoratedUrl) {
    const parser = this.getParser(decoratedUrl);
    return parser.parse();
  }

  makePayttern(decoratedUrl, parsedUrl) {
    const patternMaker = new PatternMaker(this.info);
    return patternMaker.make(decoratedUrl, parsedUrl);
  }

  getParser(decoratedUrl) {
    const parseInfo = {
      decoratedUrl,
      decorator: this.decorator,
      controllerRoute: this.controllerRoute,
    };
    return new UrlParser(parseInfo);
  }
};

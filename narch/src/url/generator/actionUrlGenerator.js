const UrlParser = require("../parser");
module.exports = class ActionUrlGenerator {
  info;
  controller;
  decorator;
  constructor(info) {
    // const {controllerRoute, action, decorator} = info;
    this.info = info;
    this.controllerRoute = info.controllerRoute;
    this.controller = info.controllerRoute.controller;
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
    return `/${this.controller.name}/${this.info.action.name}`;
  }

  // decorated() {
  //   const { pattern } = this.controllerRoute.url;
  //   const hasAction = this.hasAction(pattern);
  //   if (this.decorator && !hasAction) {
  //     return `${pattern}/${this.decorator.url}`;
  //   } else if (this.decorator && hasAction) {
  //     // delete [action]


  //     // `${pattern}/${this.decorator.url}`
  //   }
  //   return null;
  // }

  // controllerPattern + actionName
  // default() {
  //   return `/${this.info.action.name}`;
  // }

  decorated() {
    const hasDecoratedUrl = this.hasDecoratedUrl();
    return hasDecoratedUrl ? `/${this.decorator.url}` : null;
  }

  hasDecoratedUrl(){
    return this.decorator && this.decorator.url;
  }

  // hasAction(pattern) {
  //   return pattern.includes("[action]");
  // }

  // :*
  // [action]
  // [action=*]
  // [controller]
  // [controller=*]
  // text
  // controllerPattern
  pattern(decoratedUrl) {
    // در این قسمت باید روت کامل رو باید تشکیل بشه
    const parser = this.getParser(decoratedUrl);
    return parser.parse();
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

const Controllers = require("./controllers-info/controllers");
const { HttpMethods } = require("./decorators/http-methods");
const UrlParser = require("./url-parser");
module.exports = class Router {
  router = [];
  constructor() {
    this.generate();
  }

  generate() {
    const controllers = this.getControllersInfo();
    for (const name in controllers) {
      const controller = controllers[name];
      const decorator = this.getControllerDecorator(name);
      const url = this.getUrl(decorator, controller);    
      const route = {
        controller,
        url
      };
      this.router.push(route);
    }
  }

  getUrl(decorator, controller) {
    const decoratedUrl = this.getDecoratedUrl(decorator);
    const defaultUrl = this.getDefaultUrl(controller);
    const clientUrl = this.toClientUrl(decoratedUrl, decorator);
    return {
      default: defaultUrl,
      decorated: decoratedUrl,
      client: clientUrl || defaultUrl,
    }
  }

  getDefaultUrl(controller) {
    return `/${controller.name}`;
  }

  getDecoratedUrl(decorator) {
    return decorator ? `/${decorator.url}` : null;
  }

  getControllerDecorator(name) {
    const decorateInfo = HttpMethods.DecoratedInfo;
    return decorateInfo.find(
      (i) => i.method == "ROUTE" && i.context.fileName == name
    );
  }

  toClientUrl(decoratedUrl, decorator) {
    const parser = new UrlParser(decoratedUrl, decorator);
    return parser.parse();
  }

  getControllersInfo() {
    const controllers = new Controllers();
    return controllers.info();
  }
};
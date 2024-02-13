const Controllers = require("../controllers-info/controllers");
const ControllerUrlGenerator = require("./url-generator/controllerUrlGenerator");
const { HttpMethods } = require("../decorators/httpMethods");

module.exports = class ControllerRouter {
  generate(func) {
    this.foreach((controller, decorator) => {
      const controllerRoute = this.route(decorator, controller);
      if (func) func(controllerRoute);
    });
  }

  foreach(func) {
    const controllers = this.controllers();
    for (const name in controllers) {
      const controller = controllers[name];
      const decorator = this.decorator(name);
      if (func) func(controller, decorator);
    }
  }

  controllers() {
    return new Controllers();
  }

  route(decorator, controller) {
    const url = this.url(decorator, controller);
    return {
      isController: true,
      controller,
      decorator,
      url,
    };
  }

  decorator(name) {
    return (
      HttpMethods.Decorators?.find((i) => this.hasDecorator(i, name)) ?? null
    );
  }

  hasDecorator(i, name) {
    return i.method == "ROUTE" && i.context.fileName == name;
  }

  url(decorator, controller) {
    const urlGenerator = new ControllerUrlGenerator();
    return urlGenerator.generate(decorator, controller);
  }
};

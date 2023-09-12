const ContextManager = require("./contextManager");

class HttpMethods {
  detection(first, second, method) {
    const { addDecorator } = this;
    if (this.hasParam(first, second)) {
      return function decorator(context, name) {
        const data = {
          context,
          method,
          name,
          url: first,
        };
        addDecorator(data);
      };
    } else {
      const data = {
        context: first,
        method,
        name: second,
        url: null
      };
      addDecorator(data);
    }
  }

  static Decorators = [];
  addDecorator({ context, name, method, url }) {
    const contextManager = new ContextManager(context);
    const data = {
      context: contextManager.info(),
      method,
      name,
      url,
    };
    HttpMethods.Decorators.push(data);
  }

  hasParam(target, obj) {
    return typeof target == "string" && !obj;
  }

  getContextType(context) {
    const contextType = typeof context;
    return contextType == "function" ? "class" : "instanceOfClass";
  }

  getContextName(context, type) {
    const isClass = type == "class";
    if (isClass) {
      return context.name;
    } else {
      return context.constructor.name;
    }
  }

  get() {
    const methodsName = ["Put", "Post", "Delete", "Get", "Route"];
    const methods = {};
    methodsName.forEach((name) => {
      methods[name] = (first, second) =>
        this.detection(first, second, name.toUpperCase());
    });
    methods["Decorators"] = HttpMethods.Decorators;
    return methods;
  }
}

const httpMethods = new HttpMethods();
module.exports = httpMethods.get();

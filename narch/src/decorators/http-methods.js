class HttpMethods {
  detection(first, second, method) {
    const { getContextType, addToDecorateInfo, getContextName } = this;
    if (this.hasParam(first, second)) {
      return function decorator(context, name) {
        const type = getContextType(context);
        const contextName = getContextName(context, type);
        const data = {
          url: first,
          context: {
            name: contextName.split("Controller")[0],
            fileName: contextName,
            type,
            instance: context,
          },
          name,
          method,
        };
        addToDecorateInfo(data);
      };
    } else {
      const context = first;
      const type = getContextType(context);
      const data = {
        context: {
          name: getContextName(context, type),
          type,
          instance: context,
        },
        name: second,
        method,
      };
      addToDecorateInfo(data);
    }
  }

  static DecoratedInfo = [];
  addToDecorateInfo(data) {
    HttpMethods.DecoratedInfo.push(data);
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
    methods["HttpMethods"] = HttpMethods;
    return methods;
  }
}

const httpMethods = new HttpMethods();
module.exports = httpMethods.get();

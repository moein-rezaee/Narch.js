module.exports = class PatternMaker {
  info;
  constructor(info) {
    this.info = info;
  }

  make(decoratedUrl, parsedUrl) {
    const { decorator } = this.info;
    if (decorator) {
      const { method } = decorator;
      if (decoratedUrl) {
        const routePattern = this.getRoutePattern(decoratedUrl);
        const isNewRoute = this.isNewRoute(routePattern);
        if (isNewRoute) {
          return this.newPattern(method, parsedUrl);
        } else {
          return this.oldPattern(method, parsedUrl);
        }
      } else {
        return this.defaultPattern(decorator.method);
      }
    } else {
      return this.defaultPattern("GET");
    }
  }

  isNewRoute(routePattern) {
    const hasText = this.hasText(routePattern);
    const hasController = this.hasController(routePattern);
    return hasText || hasController;
  }

  hasText(routePattern) {
    return (
      routePattern.filter((i) => !i.includes("[") && !i.includes(":")).length >
      0
    );
  }

  hasController(routePattern) {
    return routePattern.filter((i) => i.includes("[controller")).length > 0;
  }

  hasAction(routePattern) {
    return routePattern.filter((i) => !i.includes("[action")).length > 0;
  }

  getRoutePattern(decoratedUrl) {
    return decoratedUrl.split("/").filter((i) => i != "");
  }

  hasArgs(args) {
    return args && args.length > 0;
  }

  joinArgs(args) {
    return "/:" + args.join("/:");
  }

  getArgsPattern(args) {
    const hasArgs = this.hasArgs(args);
    return hasArgs ? this.joinArgs(args) : "";
  }

  getDefaultArgs() {
    const { args } = this.info.action;
    return this.getArgsPattern(args);
  }

  getControllerPattern() {
    const { pattern } = this.info.controllerRoute.url;
    if (pattern) {
      if (pattern.includes("[action]")) {
        const { name } = this.info.action;
        return pattern.replace("[action]", name);
      } else {
        return pattern;
      }
    } else {
      return this.info.controllerRoute.controller.name;
    }
  }

  getUrlWithoutArgs(url) {
    const newUrl = url.split("/").filter((i) => i != "" && !i.includes(":"));
    return newUrl.join("/");
  }

  oldPattern(method, parsedUrl) {
    const controllerName = this.getControllerPattern();
    let newUrl = this.getCleanUrl(method, parsedUrl);
    return `${method}|${controllerName}/${newUrl}`;
  }

  newPattern(method, parsedUrl) {
    let newUrl = this.getCleanUrl(method, parsedUrl);
    newUrl = this.removeFirstSlash(newUrl);
    return `${method}|${newUrl}`;
  }

  getCleanUrl(method, parsedUrl) {
    let newUrl = parsedUrl;
    if (method == "GET" || method == "DELETE") {
      const defaultArgs = this.getDefaultArgs();
      const urlWithoutArgs = this.getUrlWithoutArgs(parsedUrl);
      newUrl = urlWithoutArgs + defaultArgs;
    }
    return newUrl;
  }

  removeFirstSlash(pattern) {
    const hasSlash = this.hasSlash(pattern);
    return hasSlash ? pattern.substring(1, pattern.length) : pattern;
  }

  hasSlash(pattern) {
    const char = pattern.substring(0, 1);
    return char === "/";
  }

  defaultPattern(method) {
    const controllerName = this.getControllerPattern();
    switch (method) {
      case "DELETE":
      case "GET":
        const defaultArgs = this.getDefaultArgs();
        return `${method}|${controllerName + defaultArgs}`;
      default:
        return `${method}|${controllerName}`;
    }
  }
};

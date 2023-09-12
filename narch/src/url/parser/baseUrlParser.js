
module.exports = class BaseUrlParser {
    route;
    formats;
    constructor(decoratedUrl, formats) {
      this.route = this.getValidRoute(decoratedUrl);
      this.formats = formats;
    }
  
    run(context) {
      const items = this.getRouteItems();
      items.forEach((item) => this.execute(context, item));
      return this.route?.join("/");
    }
  
    execute(context, item) {
      const funcName = this.getFuncName(item);
      if (funcName) context[funcName](item);
    }
  
    getFuncName(item) {
      const format = this.formats.find((i) => item.includes(i.val));
      if (format) return format.func;
    }
  
    getRouteItems() {
      // return this.route?.filter((i) => i.includes("[") || i.includes(":")) ?? [];
      return this.route?.filter((i) => i.includes("[")) ?? [];
    }

    getValidRoute(decoratedUrl) {
      if (decoratedUrl) {
        const route = this.getRoute(decoratedUrl);
        if (this.isValidRoute(route)) return route;
      }
      return null;
    }
  
    getRoute(decoratedUrl) {
      return decoratedUrl.split("/");
    }
  
    isValidRoute(route) {
      return route.length != 0;
    }
  
    getIndex(item) {
      return this.route.indexOf(item);
    }
  }
  
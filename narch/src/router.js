const Controllers = require("./controllers-info/controllers");


module.exports = class router {
  constructor(req) {
    this.curl();
  }

  curl() {
    const controllers = new Controllers();
    const controllersInfo = controllers.info();
  }
};

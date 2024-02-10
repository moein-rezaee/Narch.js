const FsManager = require("fs-manager");
const path = require("path");
const Controller = require("./controller");
const CONTROLLER_PATH = "../../dist/controllers";

module.exports = class Controllers {
  fs;
  constructor() {
    this.setFs();
    return this.info();
  }

  setFs() {
    this.fs = new FsManager();
  }

  getNames() {
    const controllersPath = this.path();
    return this.fs.readDir(controllersPath);
  }

  info() {
    const names = this.getNames();
    const controllers = {};
    names.forEach((name) => {
      const info = this.controller(name);
      controllers[name] = info;
    });
    return controllers;
  }

  path() {
    return path.join(__dirname, CONTROLLER_PATH);
  }

  controller(controllerName) {
    const controller = new Controller();
    return controller.info(controllerName);
  }
}










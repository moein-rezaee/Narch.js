const FsManager = require("fs-manager");
const path = require("path");
const CONTROLLER_PATH = "../dist";

module.exports = class Controllers {
  fs;
  constructor() {
    this.setFs();
  }

  setFs() {
    this.fs = new FsManager();
  }

  info() {
    const controllersPath = this.path();
    const dires = this.fs.readDir(controllersPath);
    const controllers = [];
    dires.forEach((controllerName) => {
      const info = this.controller(controllerName);
      controllers.push(info);
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










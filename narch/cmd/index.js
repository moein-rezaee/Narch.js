const inquirer = require("inquirer");
const conf = require("./configs/cmd.conf");
const filesConf = require("./configs/files.conf");
const { CMD_KEYS } = require("../utils/constants");
const FsManager = require("fs-manager");

class cmd {
  constructor() {
    this.fs = new FsManager();
    this.runCommands();
  }

  static instance() {
    return new cmd();
  }

  runCommands() {
    this.run(CMD_KEYS.COMMANDS, ({ command }) => this.execute(command));
  }

  run(name, func) {
    const prompt = inquirer.createPromptModule();
    prompt(conf[name]).then((res) => func(res));
  }

  execute(command) {
    return this[command]();
  }

  controller() {
    this.createController(CMD_KEYS.CONTROLLER);
  }

  restFulController() {
    this.createController(CMD_KEYS.REST_FUL_CONTROLLER);
  }

  createController(key) {
    this.run(key, ({ name }) => {
      const controllerInfo = this.getControllerInfo(name);
      this.fs.createFolder(controllerInfo.path);
      this.fs.whrite(controllerInfo.name, filesConf[key](name));
    });
  }

  getControllerInfo(name) {
    const basePath = "./controllers";
    const controllerName = `${name}Controller`;
    const controllerPath = `${basePath}/${controllerName}`;
    return {
      path: controllerPath,
      name: `${controllerPath}/index.js`,
    };
  }
}

cmd.instance();
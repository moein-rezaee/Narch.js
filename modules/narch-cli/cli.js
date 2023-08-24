const inquirer = require("inquirer");
const conf = require("./configs/cmd.conf");
const filesConf = require("./configs/files.conf");
const FsManager = require("fs-manager");

module.exports = class cli {
  constructor() {
    this.fs = new FsManager();
  }

  run(key, command, func) {
    const options = this.getOptions(key, command);
    this.execute(options, func);
  }

  runFunc(key, command, name, func) {
    const options = this.getOptions(key, command, name);
    this.execute(options, func);
  }

  execute(options, func) {
    const prompt = this.getPrompt();
    prompt(options).then((res) => func(res, conf));
  }

  getOptions(key, command, name = "run") {
    return conf[key][command][name];
  }

  getFileFunc(command, funcName) {
    return filesConf[command][funcName];
  }

  getFileContent(command, funcName, name) {
    const fileFunc = this.getFileFunc(command, funcName);
    return fileFunc(name);
  }

  getPrompt() {
    return inquirer.createPromptModule();
  }
};

const inquirer = require("inquirer");
const conf = require("./configs/cmd.conf");
const FsManager = require("fs-manager");

module.exports = class cli {
  constructor() {
    this.fs = new FsManager();
  }

  run(key, command, func) {
    const options = this.getOptions(key, command);
    const prompt = this.getPrompt(); 
    prompt(options).then((res) => func(res, conf));
  }

  getOptions(key, command) {
    return conf[key][command].run;
  }

  getPrompt() {
    return inquirer.createPromptModule();
  }
};

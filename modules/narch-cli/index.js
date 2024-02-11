const CLI = require("./cli");

class NarchCli extends CLI {
  argv;
  constructor() {
    super();
    this.setArgv();
  }

  setArgv() {
    this.argv = require("yargs/yargs")(process.argv.slice(2)).argv;
  }

  run(appCommands) {
    const key = this.getKey();
    if (key) {
      const command = this.getCommand(key);
      super.run(key, command, (res) => {
        const clsCommand = require(`./sections/${command}.js`);
        const funcName = res[command];
        clsCommand[funcName]();
      });
    } else {
      const list = this.getCommands();
      const command = this.getFirst(list);
      if (command) appCommands[command]();
    }
  }

  getFirst(list) {
    if (list && list.length > 0) return list[0];
    return null;
  }

  getCommands() {
    return this.argv["_"];
  }

  getCommand(key) {
    return this.argv[key];
  }

  getKeys() {
    return Object.keys(this.argv);
  }

  getKey() {
    const keys = this.getKeys();
    return keys.find((i) => !i.includes("$") && i != "_");
  }
}

module.exports = NarchCli;

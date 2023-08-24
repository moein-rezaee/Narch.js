const cli = require("./cli");

class parser extends cli {
    argv;
    constructor() {
      this.setArgv();
    }
  
    setArgv() {
      this.argv = require("yargs/yargs")(process.argv.slice(2)).argv;
    }
  
    run(appCommands) {
      const key = getKey();
      if (key) {
        const command = this.getCommand(key);
        super.run(key, command, (res) => {
          const clsCommand = require(`./narch-cli/${command}`);
        });
        // cliCommands[key][command]();
      } else {
        const list = this.getCommands();
        const command = this.getFirst(list);
        appCommands[command]();
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
  
    getKey() {
      return Object.keys(argv).find((i) => !i.includes("$") && i != "_");
    }
  }

  module.exports = new parser();
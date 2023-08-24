const cli = require("../cli");
const { CMD, KEY } = require("../constants");

class controller extends cli {
  constructor() {
    super();
  }

  empty() {
    this.create(CMD.CONTROLLER.EMPTY);
  }

  restful() {
    this.create(CMD.CONTROLLER.RESTFUL);
  }

  create(funcName) {
    const command = "controller";
    this.runFunc(KEY.CREATE, command, funcName, ({ name }) => {
      const info = this.getInfo(name);
      this.fs.createFolder(info.path);
      const content = this.getFileContent(command, funcName, name);
      this.fs.whrite(info.name, content);
    });
  }

  getInfo(name) {
    const basePath = "./controllers";
    const controllerName = `${name}Controller`;
    const controllerPath = `${basePath}/${controllerName}`;
    return {
      path: controllerPath,
      name: `${controllerPath}/index.js`,
    };
  }
}

module.exports = new controller();

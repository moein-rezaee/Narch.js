const cli = require("./cli");
const filesConf = require("./configs/files.conf");
const { CMD, KEY } = require("./constants");

class controller extends cli {
  empty() {
    this.create(CMD.CONTROLLER.EMPTY);
  }

  restful() {
    this.create(CMD.CONTROLLER.RESTFUL);
  }

  create(command) {
    this.run(KEY.CREATE, command, ({ name }) => {
      const info = this.getInfo(name);
      this.fs.createFolder(info.path);
      this.fs.whrite(info.name, filesConf[command](name));
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

const cmd = require("../manager");

module.exports = {
  c: {
    controller: {
      run: cmd.list("controller", "↪ Plaese select you'r command:", [
        cmd.item("Empty Controller", "empty", "create empty narch controller"),
        cmd.item(
          "RESTful Controller",
          "restful",
          "create empty narch restful controller"
        ),
      ]),
      empty: cmd.input("name", "↪ Plaese enter controller name:"),
      restful: cmd.input("name", "↪ Plaese enter controller name:"),
    }
  },
};

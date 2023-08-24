const cmd = require("../cmdController");

module.exports = {
  commands: cmd.list("command", "↪ Plaese select you'r command:", [
    cmd.item("Empty Controller", "controller", "create empty nurch controller"),
    cmd.item(
      "RESTful Controller",
      "restFulController",
      "create empty nurch restful controller"
    ),
  ]),
  controller: cmd.input("name", "↪ Plaese enter controller name:"),
  restFulController: cmd.input("name", "↪ Plaese enter controller name:"),
};

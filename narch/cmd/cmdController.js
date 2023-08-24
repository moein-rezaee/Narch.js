class cmdController {
  list(name, message, items) {
    return [
      {
        type: "rawlist",
        name,
        message,
        choices: items,
      },
    ];
  }

  item(title, name, desc) {
    return {
      name: title,
      value: name,
      description: desc,
    };
  }

  input(name, message) {
    const validate = this.isValidString;
    return {
      type: "input",
      name,
      default: "default",
      validate,
      message,
    };
  }

  isValidString(input) {
    const done = this.async();
    if (!input || typeof input != "string" || input.length == 0) {
      done("Please enter a valid name");
      return;
    }
    console.log(input);
    done(null, true);
  }
}

module.exports = new cmdController();

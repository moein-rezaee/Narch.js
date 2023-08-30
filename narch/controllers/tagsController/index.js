const { Put, Post, Delete } = require("../../src/decorators/http-methods");

module.exports = class tagsController {
  constructor() {}

  get(id) {
    return id;
  }

  getAll() {
    return [];
  }

  @Post
  add(data) {
    return data;
  }

  @Put
  edit(data) {
    return data;
  }

  @Delete
  delete(id) {
    return id;
  }
};

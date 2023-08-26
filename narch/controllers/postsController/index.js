const { Put, Post, Delete } = require("../../src/decorators/http-methods");

class postsController {
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
module.exports = postsController
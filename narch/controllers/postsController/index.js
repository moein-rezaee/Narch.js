const { Put, Post, Delete, Route } = require("../../src/decorators/httpMethods");

@Route("[controller]/[action]")
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
const { Put, Post, Delete } = require("../../../narch/src/decorators/http-methods");

module.exports = class tagsController {
  constructor() {}

  // GET:tags/:id
  get(id) {
    return id;
  }

  // GET:tags
  getAll() {
    return [];
  }

  @Post
  // POST:tags
  add(data) {
    return data;
  }

  @Put
  // PUT:tags
  edit(data) {
    return data;
  }

  @Delete
  // DELETE:tags/:id
  delete(id) {
    return id;
  }
};

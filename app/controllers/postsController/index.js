const { Put, Post, Delete, Route } = require("../../src/decorators/http-methods");

@Route("[controller]/[action]")
class postsController {
  constructor() {}

  // GET:posts/get/:id
  get(id) {
    return id;
  }

  // GET:posts/getAll
  getAll() {
    return [];
  }

  @Post
  // POST:posts/add
  add(data) {
    return data;
  }

  @Put
  // PUT:posts/edit
  edit(data) {
    return data;
  }

  @Delete
  // DELETE:posts/delete/:id
  delete(id) {
    return id;
  }
};
module.exports = postsController
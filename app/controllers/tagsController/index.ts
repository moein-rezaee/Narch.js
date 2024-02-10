import Narch from 'narch';
const { Put, Post, Delete, Get, Route } = Narch.Decorators.RouterMethods;

export default class tagsController {
  constructor() {}

  // GET:tags/:id
  get(id) {
    return id;
  }

  // GET:tags
  getAll() {
    return [];
  }

  @Post()
  // POST:tags
  add(data) {
    return data;
  }

  @Put()
  // PUT:tags
  edit(data) {
    return data;
  }

  @Delete()
  // DELETE:tags/:id
  delete(id) {
    return id;
  }
};

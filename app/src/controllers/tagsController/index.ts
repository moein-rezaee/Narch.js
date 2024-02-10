import Narch from 'narch';
const { Put, Post, Delete, Get, Route } = Narch.Decorators.RouterMethods;

export default class tagsController {
  constructor() {}

  // GET:tags/:id
  get(id: string): string {
    return id;
  }

  // GET:tags
  getAll() {
    return [];
  }

  @Post()
  // POST:tags
  add(data: any): any {
    return data;
  }

  @Put()
  // PUT:tags
  edit(data: any): any {
    return data;
  }

  @Delete()
  // DELETE:tags/:id
  delete(id: string): string {
    return id;
  }
};

module.exports = tagsController;

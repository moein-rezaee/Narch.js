import { RouterMethods } from 'narch/src/decorators/routerMethods';
const { Put, Post, Delete, Get, Route } = RouterMethods;


@Route("[controller]/[action]")
export default class postsController {
  constructor() { }

  // GET:posts/get/:id
  get(id: string): string {
    return id;
  }

  // GET:posts/getAll
  getAll() {
    return [];
  }

  @Post()
  // POST:posts/add
  add(data: any): any {
    return data;
  }

  @Put()
  // PUT:posts/edit
  edit(data: any): any {
    return data;
  }

  @Delete()
  // DELETE:posts/delete/:id
  delete(id: string): string {
    return id;
  }
};

module.exports = postsController;

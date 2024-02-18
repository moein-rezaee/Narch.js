import { RouterMethods } from 'narch/src/decorators/routerMethods';
const { Put, Post, Delete, Get, Route } = RouterMethods;

@Route("blogs")
class defaultController {
  constructor() { }
  
  get(id: string): string {
    return id;
  }
  
  getAll(): Array<any> {
    return [];
  }

  @Post()
  add(data: any, files: any): any {
    return { data, files };
  }

  @Put()
  edit(data: any): any {
    return data;
  }

  @Delete()
  delete(id: string): string {
    return id;
  }
};

module.exports = defaultController;
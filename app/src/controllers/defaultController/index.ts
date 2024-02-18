import { RouterMethods } from 'narch/src/decorators/routerMethods';
import { DataValidators } from 'narch/src/decorators/dataValidators';
import { User } from '../../models/blog';
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
  add(data: User, files: any): any {
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

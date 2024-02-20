import { ModelDecorator } from 'narch/src/decorators/modelDecorator';
import { RouterMethods } from 'narch/src/decorators/routerMethods';
// import { DataValidators } from 'narch/src/decorators/ModelValidator';
import { User } from '../../models/user';
const { Put, Post, Delete, Get, Route } = RouterMethods;
const { Model } = ModelDecorator;

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
  @Model(User)
  add(user: User, files: any): any {  
    return { user, files };
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

const inst = new defaultController();

module.exports = defaultController;

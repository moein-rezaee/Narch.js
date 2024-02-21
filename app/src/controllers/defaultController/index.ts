import { RouterDecorator } from 'narch/src/decorators/routerDecorator';
const { Put, Post, Delete, Get, Route } = RouterDecorator;

import { User } from '../../models/user';
import { ModelDecorator } from 'narch/src/decorators/modelDecorator';
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

module.exports = defaultController;

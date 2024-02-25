import { RouterDecorator } from 'narch/src/decorators/routerDecorator';
import { ModelDecorator } from 'narch/src/decorators/modelDecorator';
import { FormFilesDecorator } from 'narch/src/decorators/formFilesDecorator';

const { Put, Post, Delete, Get, Route } = RouterDecorator;
const { Model } = ModelDecorator;
const { FormFiles } = FormFilesDecorator;

import { Blog } from '../../models/blog';
import { User } from '../../models/user';
import { MeliCode, Profile } from '../../filesSchemas';

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
  @FormFiles(MeliCode, Profile)
  add(user: User, blog: Blog, files: any): any {  
    return { user, files, blog };
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

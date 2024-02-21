module.exports = {
  controller: {
    empty: (name) => `import { RouterDecorator } from 'narch/src/decorators/routerDecorator';
    const { Put, Post, Delete, Get, Route } = RouterDecorator;
    module.exports = class ${name}Controller {
        constructor() {
        }
    }`,
    restful: (name) => `import { RouterDecorator } from 'narch/src/decorators/routerDecorator';
    const { Put, Post, Delete, Get, Route } = RouterDecorator;
    module.exports = class ${name}Controller {
      get(id: string): string {
        return id;
      }
      
      getAll(): Array<any> {
        return [];
      }
    
      @Post()
      add(data: any): any {
        return data;
      }
    
      @Put()
      edit(data: any): any {
        return data;
      }
    
      @Delete()
      delete(id: string): string {
        return id;
      }
    };`,
  },
};

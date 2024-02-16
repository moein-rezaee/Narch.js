module.exports = {
  controller: {
    empty: (name) => `import { RouterMethods } from 'narch/src/decorators/routerMethods';
    const { Put, Post, Delete, Get, Route } = RouterMethods;
    module.exports = class ${name}Controller {
        constructor() {
        }
    }`,
    restful: (name) => `import { RouterMethods } from 'narch/src/decorators/routerMethods';
    const { Put, Post, Delete, Get, Route } = RouterMethods;
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

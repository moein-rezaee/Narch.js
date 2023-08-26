module.exports = {
  controller: {
    empty: (name) => `module.exports = class ${name}Controller {
        constructor() {
        }
    }`,
    restful: (name) => `module.exports = class ${name}Controller {
        constructor() {
        }
    
        get(id) {
            return id;
        }
    
        getAll() {
            return []
        }
    
        @Post
        add(data) {
            return data;
        }
    
        @Put
        edit(data) {
            return data;
        }
    
        @Delete
        delete(id) {
            return id;
        }
    }`,
  },
};

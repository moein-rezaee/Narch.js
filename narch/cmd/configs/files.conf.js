module.exports = {
  controller: (name) => `module.exports = class ${name}Controller {
    constructor() {
    }
}`,
  restFulController: (name) => `module.exports = class ${name}Controller {
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
    edit(id) {
        return id;
    }
}`,
};

module.exports = class restfulController {
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
}
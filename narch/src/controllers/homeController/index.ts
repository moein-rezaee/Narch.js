
class HomeController {
    constructor() {

    }

    @Get
    get(id: string) {
        return  id;
    }

    // @Get
    // getAll() {
    //     return [];
    // }

    // @Post
    // add(data: any) {
    //     return data
    // }

    // @Put
    // edit(id: string, data: any) {
    //     return { id, data };
    // }

    // @Delete
    // delete(id: string) {
    //     return `Deleting item with id ${id}`;
    // }
}

function Get(
    target: (id: string) => string, 
    context: ClassMethodDecoratorContext<
        HomeController, 
        (id: string) => string
    > & { name: "get"; private: false; static: false; }): void | ((id: string) => string) {
    throw new Error("Function not implemented.");
}

new HomeController()
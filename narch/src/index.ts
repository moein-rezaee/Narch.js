// #!/usr/bin/env node

// import http from "http";
// import Endpoint from "./endpoint.js";

// const cli: any = require("narch-cli");
// const appCommands = {
//   run,
// };

// function run(): void {
//   const server = http.createServer((req: any, res: any) => {
//     try {
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       if (req.url == "/") {
//         res.end("Narch.js is runed");
//       } else {
//         const { url, method } = req;
//         const endpoint = new Endpoint(url, method);
//         const result = endpoint.execute();
//         res.end(JSON.stringify(result));
//       }
//     } catch (error) {
//       res.writeHead(500, {'Content-Type': 'text/plain'});;
//       res.end(JSON.stringify(error));
//     } 
//   });
//   server.listen(3000);
//   console.log("Narch server started on: http://localhost:3000");
// }

// cli.run(appCommands);


class HomeController {
    constructor() {

    }

    @Get
    get(id: string) {
        return id;
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
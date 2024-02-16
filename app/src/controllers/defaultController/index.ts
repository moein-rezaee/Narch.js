import { RouterMethods } from 'narch/src/decorators/routerMethods';
const { Put, Post, Delete, Get, Route } = RouterMethods;

// admin/blog
// ✅ @Route("admin/blog")

// admin/blog
// ✅ @Route("admin/[controller=blog]")

// admin/default
// @Route("admin/[controller]")
// admin/default/[action]
// @Route("admin/[controller]/[action]")
// default
// @Route("[controller]")
// blog
// @Route("[controller=blog]")
@Route("admin/[controller=blog]")
class defaultController {
  constructor() { }

  // GET:getOne/12
  // @Get("getOne/:id")

  // GET:blogs/getOne/:id
  // @Get("[action=getOne]")
  // @Get("[action=getOne]/:id")
  // @Get("[controller]/[action=getOne]")
  // @Get("[controller]/[action=getOne]/:id")

  // GET:post/getOne/:id
  // ✅ @Get("[controller=post]/[action=getOne]")

  // GET:blogs/:id
  // ✅ @Get(":id")
  get(id: string): string {
    return id;
  }

  // GET:blogs/getAll
  // @Get([action=getAll])

  // GET:blogs
  // ✅ @Get
  
  // ✅ @Get('[controller]/[action]')
  getAll(): Array<any> {
    return [];
  }

  // GET:blogs/comments/:postId
  // @Get('[controller]/comments/:postId')
  // @Get('[controller]/comments')

  // GET:comments/:postId/:text
  // @Get('comments')
  // getComments(postId, text)

  // -- specialId is param
  // -- specialId is optional
  // GET:blogs/:specialId?
  // @Get(":specialId?")
  // specialGet(specialId) {
  //   return specialId;
  // }

  // ==================================

  @Post()
  add(data: any, files: any): any {
    return { data, files };
  }

  // -- change url
  // -- postId is param
  // -- postId is optional
  // -- data is body
  // POST:blogs/details Or POST:blogs/details/:postId
  // @Post("[controller]/details/:postId?")

  // POST:blogs/specialPost Or POST:blogs/specialPost/:postId
  // @Post("[controller]/[action]/:postId?")
  // specialPost(postId, data) {
  //   return [];
  // }

  // ==================================

  @Put()
  edit(data: any): any {
    return data;
  }

  // PUT:blogs/:id/:txt
  // @Put('[controller]/:id/:txt')
  // specialPut(id, data, txt)

  // -- id is param
  // -- data is body
  // @Put(':id')
  // // PUT:blogs/:id
  // specialPut(id, data)  {
  //   return data;
  // }

  // ==================================

  @Delete()
  // ✅ DELETE:blogs/:id
  delete(id: string): string {
    return id;
  }

  // DELETE:blogs/:specialId Or DELETE:blogs
  // @Delete(":specialId?")
  // specialDel(specialId) {
  //   return specialId;
  // }
};

module.exports = defaultController;
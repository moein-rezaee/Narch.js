const { Put, Post, Delete, Get, Route } = require("../../src/decorators/httpMethods");

// admin/blog
// @Route("admin/blog")
// admin/blog
// @Route("admin/[controller=blog]")
// admin/default
// @Route("admin/[controller]")
// default
// @Route("[controller]")
// blog
// @Route("[controller=blog]")
@Route("blogs")
class defaultController {
  constructor() {}
  
  // getOne/12
  // @Get("getOne/:id")
  
  // blogs/getOne/12
  // @Get("[action=getOne]")
  // @Get("[action=getOne]/:id")
  // @Get("[controller]/[action=getOne]")
  
  // post/getOne/12
  // @Get("[controller=post]/[action=getOne]")
  
  // blog/:id
  // @Get(":id")
  get(id) {
    return id;
  }

  // blog/getAll
  // @Get([action=getAll])
  // blog
  // @Get
  // @Get([controller])
  getAll() {
    return [];
  }
  
  // blog/comments/:postId
  // @Get('[controller]/comments/:postId')
  // @Get('[controller]/comments')
  
  // comments/:postId/:text
  // @Get('comments')
  // getComments(postId, text)
  
  // specialId is param
  // specialId is optional
  // blog/:specialId?
  @Get(":specialId?")
  specialGet(specialId) {
    return specialId;
  }

  // ==================================

  @Post
  add(data)  {
    return data;
  }

  // change url
  // postId is param 
  // postId is optional 
  // data is body 
  // blog/details Or blog/details/:postId
  // @Post("[controller]/details/:postId?")
  
  // blog/specialPost Or blog/specialPost/:postId
  @Post("[controller]/[action]/:postId?")
  specialPost(postId, data) {
    return [];
  }
  
  // ==================================

  @Put
  edit(data) {
    return data;
  }
  
  // blog/:id/:txt
  // @Put('[controller]/:id/:txt') 
  // specialPut(id, data, txt)
  
  // id is param
  // data is body
  @Put(':id') 
  specialPut(id, data)  {
    return data;
  }

  // ==================================

  @Delete
  delete(id) {
    return id;
  }

  // blog/:specialId Or blog
  @Delete(":specialId?")
  specialDel(specialId) {
    return specialId;
  }
};

module.exports = defaultController;
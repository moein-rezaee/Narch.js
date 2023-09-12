"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
const {
  Put,
  Post,
  Delete,
  Get,
  Route
} = require("../../src/decorators/httpMethods");

// admin/blog
// @Route("admin/blog")
// admin/blog
// @Route("admin/[controller=blog]")
// admin/default
// @Route("admin/[controller]")
// admin/default/[action]
// @Route("admin/[controller]/[action]")
// default
// @Route("[controller]")
// blog
// @Route("[controller=blog]")
let defaultController = (_dec = Route("blogs"), _dec2 = Get(":specialId?"), _dec3 = Post("[controller]/[action]/:postId?"), _dec4 = Put(':id'), _dec5 = Delete(":specialId?"), _dec(_class = (_class2 = class defaultController {
  constructor() {}

  // GET:getOne/12
  // @Get("getOne/:id")

  // GET:blogs/getOne/:id
  // @Get("[action=getOne]")
  // @Get("[action=getOne]/:id")
  // @Get("[controller]/[action=getOne]")
  // @Get("[controller]/[action=getOne]/:id")

  // GET:post/getOne/:id
  // @Get("[controller=post]/[action=getOne]")

  // GET:blogs/:id
  // @Get(":id")
  get(id) {
    return id;
  }

  // GET:blogs/getAll
  // @Get([action=getAll])

  // GET:blogs
  // @Get
  // @Get([controller])
  getAll() {
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
  specialGet(specialId) {
    return specialId;
  }

  // ==================================

  add(data) {
    return data;
  }

  // -- change url
  // -- postId is param 
  // -- postId is optional 
  // -- data is body 
  // POST:blogs/details Or POST:blogs/details/:postId
  // @Post("[controller]/details/:postId?")

  // POST:blogs/specialPost Or POST:blogs/specialPost/:postId
  specialPost(postId, data) {
    return [];
  }

  // ==================================

  edit(data) {
    return data;
  }

  // PUT:blogs/:id/:txt
  // @Put('[controller]/:id/:txt') 
  // specialPut(id, data, txt)

  // -- id is param
  // -- data is body
  // PUT:blogs/:id
  specialPut(id, data) {
    return data;
  }

  // ==================================

  // DELETE:blogs/:id
  delete(id) {
    return id;
  }

  // DELETE:blogs/:specialId Or DELETE:blogs
  specialDel(specialId) {
    return specialId;
  }
}, (_applyDecoratedDescriptor(_class2.prototype, "specialGet", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "specialGet"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "add", [Post], Object.getOwnPropertyDescriptor(_class2.prototype, "add"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "specialPost", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "specialPost"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "edit", [Put], Object.getOwnPropertyDescriptor(_class2.prototype, "edit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "specialPut", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "specialPut"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delete", [Delete], Object.getOwnPropertyDescriptor(_class2.prototype, "delete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "specialDel", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "specialDel"), _class2.prototype)), _class2)) || _class);
;
module.exports = defaultController;
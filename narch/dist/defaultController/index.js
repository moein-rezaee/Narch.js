"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
const {
  Put,
  Post,
  Delete,
  Get,
  Route
} = require("../../src/decorators/http-methods");

// admin/blog
// @Route("admin/[controller=blog]")
// blog
// @Route("[controller=blog]")
// blog
let defaultController = (_dec = Route("blog"), _dec2 = Get(":specialId?"), _dec3 = Post("[controller]/details/:postId?"), _dec4 = Put(':id'), _dec5 = Delete(":specialId?"), _dec(_class = (_class2 = class defaultController {
  constructor() {}

  // getOne/12
  // @Get("getOne/:id")

  // blog/getOne/12
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
  specialGet(specialId) {
    return specialId;
  }

  // ==================================

  add(data) {
    return data;
  }

  // change url
  // post id is param 
  // post id is optional 
  // data is body 
  // blog/details Or blog/details:postId
  specialPost(postId, data) {
    return [];
  }

  // ==================================

  edit(data) {
    return data;
  }

  // blog/:id/:txt
  // @Put('[controller]/:id/:txt') 
  // specialPut(id, data, txt)

  // id is param
  // data is body
  specialPut(id, data) {
    return data;
  }

  // ==================================

  delete(id) {
    return id;
  }

  // blog/:specialId Or blog
  specialDel(specialId) {
    return specialId;
  }
}, (_applyDecoratedDescriptor(_class2.prototype, "specialGet", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "specialGet"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "add", [Post], Object.getOwnPropertyDescriptor(_class2.prototype, "add"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "specialPost", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "specialPost"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "edit", [Put], Object.getOwnPropertyDescriptor(_class2.prototype, "edit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "specialPut", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "specialPut"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delete", [Delete], Object.getOwnPropertyDescriptor(_class2.prototype, "delete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "specialDel", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "specialDel"), _class2.prototype)), _class2)) || _class);
;
module.exports = defaultController;
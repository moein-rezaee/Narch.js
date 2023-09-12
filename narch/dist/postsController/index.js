"use strict";

var _dec, _class, _class2;
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
const {
  Put,
  Post,
  Delete,
  Route
} = require("../../src/decorators/http-methods");
let postsController = (_dec = Route("[controller]/[action]"), _dec(_class = (_class2 = class postsController {
  constructor() {}

  // GET:posts/get/:id
  get(id) {
    return id;
  }

  // GET:posts/getAll
  getAll() {
    return [];
  }
  // POST:posts/add
  add(data) {
    return data;
  }
  // PUT:posts/edit
  edit(data) {
    return data;
  }
  // DELETE:posts/delete/:id
  delete(id) {
    return id;
  }
}, (_applyDecoratedDescriptor(_class2.prototype, "add", [Post], Object.getOwnPropertyDescriptor(_class2.prototype, "add"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "edit", [Put], Object.getOwnPropertyDescriptor(_class2.prototype, "edit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delete", [Delete], Object.getOwnPropertyDescriptor(_class2.prototype, "delete"), _class2.prototype)), _class2)) || _class);
;
module.exports = postsController;
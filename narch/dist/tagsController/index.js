"use strict";

var _class;
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
const {
  Put,
  Post,
  Delete
} = require("../../src/decorators/httpMethods");
module.exports = (_class = class tagsController {
  constructor() {}

  // GET:tags/:id
  get(id) {
    return id;
  }

  // GET:tags
  getAll() {
    return [];
  }
  // POST:tags
  add(data) {
    return data;
  }
  // PUT:tags
  edit(data) {
    return data;
  }
  // DELETE:tags/:id
  delete(id) {
    return id;
  }
}, (_applyDecoratedDescriptor(_class.prototype, "add", [Post], Object.getOwnPropertyDescriptor(_class.prototype, "add"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "edit", [Put], Object.getOwnPropertyDescriptor(_class.prototype, "edit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "delete", [Delete], Object.getOwnPropertyDescriptor(_class.prototype, "delete"), _class.prototype)), _class);
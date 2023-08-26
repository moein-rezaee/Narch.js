function Get(url) {
  return function decorator(target, obj) {
    console.log(typeof target, obj, url);
  };
}
function Put(url) {
  return function decorator(target, obj) {
    console.log(typeof target, obj, url);
  };
}
function Post(url) {
  return function decorator(target, obj) {
    console.log(typeof target, obj, url);
  };
}
function Delete(url) {
  return function decorator(target, obj) {
    console.log(typeof target, obj, url);
  };
}
function Route(url) {
  return function decorator(target, obj) {
    console.log(typeof target, obj, url);
  };
}

module.exports = {
  Put,
  Post,
  Delete,
  Get,
  Route,
};

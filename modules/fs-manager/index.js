const fs = require("fs");

module.exports = class FsManager {
  static UTF8 = "utf8";

  #encoding;
  constructor(encoding = FsManager.UTF8) {
    this.#encoding = encoding;
  }

  read(path) {
    let data = null;
    fs.readFileSync(path, this.#encoding, (res, err) => {
      if (err) throw err;
      data = res
    });
    return data
  }

  append(path, content) {
    try {
      fs.appendFileSync(path, content, this.#encoding, this.checkException);
    } catch (error) {
      throw error.message;
    }
  }

  async whrite(path, content) {
    try {
      fs.writeFileSync(path, content, this.#encoding, this.checkException);
    } catch (error) {
      throw error.message;
    }
  }

  isExists(path) {
    return fs.existsSync(path);
  }

  remove(path) {
    if (this.isExists(path)) fs.unlinkSync(path, this.checkException);
  }

  checkException(err) {
    if (err) throw err;
  }

  createFolder(path) {
    if (!this.isExists(path)) fs.mkdirSync(path, { recursive: true });
  }
};

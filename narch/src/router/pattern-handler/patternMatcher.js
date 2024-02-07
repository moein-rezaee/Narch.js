const Router = require("../index");

module.exports = class PatternMatcher {
  url;
  list = [];
  limitedPatterns;
  constructor(url, method) {
    const cleanUrl = this.cleanUrl(url);
    this.url = {
      method,
      parts: this.getUrlParts(cleanUrl),
      value: cleanUrl,
    };
    this.limitPatterns();
    this.extractData();
  }
  cleanUrl(url) {
    return url.substring(1, url.length);
  }
  getUrlParts(url) {
    return url.split("/");
  }

  getAllMatches() {
    return this.list?.filter((i) => i.isMatch);
  }

  getLimitedPatternValue(index) {
    return this.limitedPatterns[index]?.value;
  }

  getFullMatches(matches) {
    return matches?.filter((i) => i.isFullMatch);
  }

  findeMatchPattern() {
    const matches = this.getAllMatches();
    if (matches?.length > 1) {
      const fullMatch = this.getFullMatches(matches);
      if (fullMatch?.length == 1) {
        //Founded
        return {
          value: this.getLimitedPatternValue(fullMatch[0].patternIndex),
          details: fullMatch[0],
        };
      } else {
        throw "more than one route mathch founded!";
      }
    } else if (matches?.length == 1) {
      //Founded
      return {
        value: this.getLimitedPatternValue(matches[0].patternIndex),
        details: matches[0],
      };
    }
    throw "not found 404!";
  }

  extractData() {
    if (this.urlPartsIsValid()) {
      this.limitedPatterns?.forEach((pattern, patternIndex) => {
        this.add(patternIndex);
        pattern.parts.forEach((patternItem, patternItemIndex) => {
          const detail = this.getDetails(patternItemIndex, patternItem);
          if (this.isEqual(patternItem, patternItemIndex)) {
            this.addToEquals(patternIndex, detail);
          } else {
            if (this.isDaynamic(patternItem))
              this.addToDynamics(patternIndex, detail);
            else this.addToNotEquals(patternIndex, detail);
          }
        });
        this.setIsMatch(patternIndex);
        this.setIsFullMatch(patternIndex);
      });
    }
  }

  isEqual(patternItem, patternItemIndex) {
    const reqUrlParts = this.url.parts;
    return patternItem == reqUrlParts[patternItemIndex];
  }

  isDaynamic(patternItem) {
    return patternItem.includes(":");
  }

  urlPartsIsValid() {
    const reqUrlParts = this.url.parts;
    return reqUrlParts && reqUrlParts.length > 0 && reqUrlParts[0] != "";
  }

  limitPatterns() {
    const { patterns } = new Router();
    const method = this.url.method;
    const urlPartsCount = this.url.parts.length;
    this.limitedPatterns = patterns.filter(
      (i) => i.method == method && i.parts.length == urlPartsCount
    );
  }

  create(patternIndex) {
    return {
      patternIndex,
      equals: [],
      dynamics: [],
      notEquals: [],
      isMatch: false,
      isFullMatch: false,
    };
  }

  add(patternIndex) {
    const item = this.create(patternIndex);
    this.list.push(item);
  }

  addToEquals(patternIndex, detail) {
    this.list[patternIndex].equals.push(detail);
  }

  addToNotEquals(patternIndex, detail) {
    this.list[patternIndex].notEquals.push(detail);
  }

  addToDynamics(patternIndex, detail) {
    this.list[patternIndex].dynamics.push(detail);
  }

  setIsMatch(patternIndex) {
    const reqUrlPartsLength = this.url.parts.length;
    const item = this.list[patternIndex];
    const otherLength = item.dynamics.length + item.equals.length;
    item.isMatch =
      item.notEquals.length === 0 && otherLength === reqUrlPartsLength;
  }

  setIsFullMatch(patternIndex) {
    const item = this.list[patternIndex];
    const reqUrlPartsLength = this.url.parts.length;
    item.isFullMatch =
      item.equals.length === reqUrlPartsLength &&
      item.notEquals.length === 0 &&
      item.dynamics.length === 0;
  }

  getDetails(patternItemIndex, patternItem) {
    return {
      patternItemIndex,
      reqUrlPart: this.url.parts[patternItemIndex],
      patternItem,
    };
  }
};

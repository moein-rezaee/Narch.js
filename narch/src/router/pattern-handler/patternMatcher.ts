import { IPatternMatcher, IRouter } from "../../interfaces";
import { MatchedDetail, MatchedPattern, Pattern, PatternInfo } from "../../types";

import Router from "../index";

export class PatternMatcher implements IPatternMatcher {
  private readonly url: Pattern;
  private patternInfo: PatternInfo[] = [];
  private limitedPatterns: Pattern[] = [];

  constructor(url: string, method: string) {
    const cleanUrl = this.cleanUrl(url);
    this.url = {
      method,
      parts: this.getUrlParts(cleanUrl),
      value: cleanUrl,
    };
    this.limitPatterns();
    this.extractData();
  }
  private cleanUrl(url: string): string {
    return url.substring(1, url.length);
  }
  private getUrlParts(url: string): Array<string> {
    return url.split("/");
  }

  public findeMatchPattern(): MatchedPattern {
    const matches: Array<PatternInfo> = this.getAllMatches();
    if (matches?.length > 1) {
      const fullMatch = this.getFullMatches(matches);
      if (fullMatch?.length == 1) {
        //Founded
        return {
          value: this.getLimitedPatternValue(fullMatch[0].patternIndex),
          details: fullMatch[0],
        } as MatchedPattern;
      } else {
        throw "more than one route mathch founded!";
      }
    } else if (matches?.length == 1) {
      //Founded
      // TODO: detail changed to -> details | endpoint not use it !!!
      return {
        value: this.getLimitedPatternValue(matches[0].patternIndex),
        details: matches[0],
      } as MatchedPattern;
    }
    throw "not found 404!";
  }

  private getAllMatches(): Array<PatternInfo> {
    return this.patternInfo?.filter((i: PatternInfo) => i.isMatch);
  }

  private getLimitedPatternValue(index: number): string {
    return this.limitedPatterns[index]?.value;
  }

  private getFullMatches(matches: Array<PatternInfo>): Array<PatternInfo> {
    return matches?.filter((i: PatternInfo) => i.isFullMatch);
  }

  private extractData() {
    if (this.urlPartsIsValid()) {
      this.limitedPatterns?.forEach((pattern, patternIndex) => {
        this.add(patternIndex);
        pattern.parts.forEach((patternItem, patternItemIndex) => {
          const detail = this.getMatchedDetail(patternItemIndex, patternItem);
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

  private isEqual(patternItem: string, patternItemIndex: number) {
    const reqUrlParts: Array<String> = this.url.parts;
    return patternItem == reqUrlParts[patternItemIndex];
  }

  private isDaynamic(patternItem: string) {
    return patternItem.includes(":");
  }

  private urlPartsIsValid() {
    const reqUrlParts = this.url.parts;
    return reqUrlParts && reqUrlParts.length > 0 && reqUrlParts[0] != "";
  }

  private limitPatterns() {
    const { patterns } = new Router() as IRouter;
    const method: string = this.url.method;
    const urlPartsCount: number = this.url.parts.length;

    this.limitedPatterns = patterns.filter(
      (i: Pattern) => i.method == method && i.parts.length == urlPartsCount
    );
  }

  private create(patternIndex: number): PatternInfo {
    const patternInfo: PatternInfo = {
      patternIndex,
      equals: [],
      dynamics: [],
      notEquals: [],
      isMatch: false,
      isFullMatch: false
    }
    return patternInfo;
  }

  private add(patternIndex: number): void {
    const item = this.create(patternIndex);
    this.patternInfo.push(item);
  }

  private addToEquals(patternIndex: number, detail: MatchedDetail): void {
    this.patternInfo[patternIndex].equals.push(detail);
  }

  private addToNotEquals(patternIndex: number, detail: MatchedDetail): void {
    this.patternInfo[patternIndex].notEquals.push(detail);
  }

  private addToDynamics(patternIndex: number, detail: MatchedDetail): void {
    this.patternInfo[patternIndex].dynamics.push(detail);
  }

  private setIsMatch(patternIndex: number): void {
    const reqUrlPartsLength = this.url.parts.length;
    const item = this.patternInfo[patternIndex];
    const otherLength = item.dynamics.length + item.equals.length;
    item.isMatch =
      item.notEquals.length === 0 && otherLength === reqUrlPartsLength;
  }

  private setIsFullMatch(patternIndex: number): void {
    const item = this.patternInfo[patternIndex];
    const reqUrlPartsLength = this.url.parts.length;
    item.isFullMatch =
      item.equals.length === reqUrlPartsLength &&
      item.notEquals.length === 0 &&
      item.dynamics.length === 0;
  }

  private getMatchedDetail(patternItemIndex: number, patternItem: string) {
    return {
      patternItemIndex, // patternItemIndex,
      reqUrlPart: this.url.parts[patternItemIndex],
      patternItem,
    } as MatchedDetail;
  }
};
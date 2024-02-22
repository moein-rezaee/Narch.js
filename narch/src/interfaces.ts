import { Action, MatchedPattern, Pattern, RoutesData } from "./types.js";

export interface IRouter {
    get routesData(): RoutesData;
    get actions(): Array<Action>;
    get controllers(): Array<any>;
    get patterns(): Array<Pattern>;
}

export interface IPatternMatcher {
    findeMatchPattern(): MatchedPattern,
};

export interface IEndpoint {
    execute(): any
}

export interface IRouterMethods {
    Route(pattern: string): Function;
    Get(pattern?: string): Function;
    Put(pattern?: string): Function;
    Post(pattern?: string): Function;
    Delete(pattern?: string): Function;
}

export interface IDecorators {
    RouterMethods: IRouterMethods
}
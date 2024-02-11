
export type RoutesData = {
    controllers: Array<any>,
    actions: Array<any>,
    patterns: Array<Pattern>,
}

export type PatternInfo = {
    patternIndex: number,
    equals: Array<MatchedDetail>,
    dynamics: Array<MatchedDetail>,
    notEquals: Array<MatchedDetail>,
    isMatch: boolean,
    isFullMatch: boolean,
}

export type MatchedDetail = {
    patternItemIndex: number,
    reqUrlPart: string,
    patternItem: string
};

export type MatchedPattern = {
    details: PatternInfo,
    value: string
}

export type Pattern = {
    method: string,
    parts: Array<string>,
    value: string
};

export type ContextInfo = {
    name: string,
    fileName: string,
    type: "class" | "instanceOfClass",
    instance: any,
}

export type Decorator = {
    context: ContextInfo,
    method: string,
    name?: string,
    url?: string,
};
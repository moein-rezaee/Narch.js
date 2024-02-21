export type FieldDecoratorType = {
    key: string,
    context: any, 
    property: string | symbol, 
    message?: string,
    value?: number | any | string,
    validator?: any
}

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

export type RouterMethod = {
    context: ContextInfo,
    method: string,
    name?: string,
    url?: string,
};

export type FileInfo = {
    data: any,
    fieldName: string,
    size: number,
    filename: string,
    mimeType: string,
}

export type FileDataInfo = {
    data: any,
    fieldName: string,
    size: any,
    ext: string,
    filename: string,
    mimeType: string,
    address?: string,
}


export type ModelDecoratorType = {
    entity: any,
    key: string,
    context: ContextInfo,
    funcName: string | symbol
}

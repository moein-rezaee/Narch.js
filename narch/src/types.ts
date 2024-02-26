import { FilesValidator } from "./validators/filesValidator"
import { ModelValidator } from "./validators/modelValidator"

export type FieldDecoratorType = {
    key: string,
    context: any,
    property: string | symbol,
    message?: string,
    value?: number | any | string,
    validator?: any
}


export type Action = {
    isController: boolean,
    context: any,
    method: string,
    decorator: RouterMethod,
    modelValidator: ModelValidator,
    filesValidator: FilesValidator,
    action: any,
    url: any,
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
    filename: string,
    mimeType: string,
    size?: number,
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

export type ValidateObject = {
    prop: string,
    data: any,
    dataValidator: FieldDecoratorType
}

export type ValidateResultType = {
    result: boolean,
    errorMessage: string
}


export type FormFilesDecoratorType = {
        files: Array<FormFileType>,
    context: ContextInfo,
    funcName: string | symbol
}


export type FormFileType = {
    key: string;
    fieldName: string;
    saveTo: string;
    validMimeTypes: Array<string>;
    validSizeInMB: number;
    validFilesCount?: FileCount;
    isRequire?: boolean,
}

export type FileCount = {
    isEqual?: boolean,
    value: number  
}
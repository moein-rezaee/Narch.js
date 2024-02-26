import { FileCount, FormFileType } from "narch/src/types";

export const MeliCode: FormFileType = {
    key: "meliCode",
    fieldName: "meliCode",
    saveTo: "public/uploads",
    validMimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    validFilesCount: {
        value: 2,
        isEqual: false
    } as FileCount,
    validSizeInMB: 1,
    isRequire: true
}

export const Profile: FormFileType = {
    key: "profile",
    fieldName: "image",
    saveTo: "public/uploads/users",
    validMimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    validSizeInMB: 1
}